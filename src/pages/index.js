import Api from "../components/Api.js";
import { createdMap, initMap, deleteMap } from "../components/ymap.js";


const mainCity = document.querySelector('.city');
const temperature = mainCity.querySelector('.city__tem');
const cityName = mainCity.querySelector('.city__name');
const weatherDesc = mainCity.querySelector('.city__descrip-weather');
const weatherIcon = mainCity.querySelector('.city__icon-weather');
const cityDate = mainCity.querySelector('.city__date');

const addInfo = document.querySelector('.add-info');
const searchForm = addInfo.querySelector('.add-info__form');
const temFeelsLike = addInfo.querySelector('.add-info__data_type_feels');
const wind = addInfo.querySelector('.add-info__data_type_wind');
const humidity = addInfo.querySelector('.add-info__data_type_humidity');
const userCity = addInfo.querySelector('.add-info__list-el_type_main');
const precipitation = addInfo.querySelector('.add-info__data_type_precipitation');

const photoTown = document.querySelector('.weather__pic');


// функция отображения данных на странице
function changeContent(data) {
  cityName.textContent = data.name;
  temperature.innerHTML = Math.round(data.main.temp) + '&deg;';
  weatherDesc.textContent = data.weather[0]['description'];
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
  cityDate.textContent = genereteDate(data);
  temFeelsLike.innerHTML = Math.round(data.main.feels_like) + '&deg;';
  wind.textContent = `${data.wind.speed} м/с`;
  humidity.textContent = `${data.main.humidity}%`;
  precipitation.textContent = findPrecipitation(data);
}


// функция отображения города пользователя в панели слева
function getUserCity(data) {
  userCity.textContent = data.name;
}

// функция отображения осадков
function findPrecipitation(data) {
  if (!data.rain && !data.snow) {
    return '0 мм';
  }
  return `${(data.rain) ? data.rain['1h'] : data.snow['1h']} мм`
}


// функция верного отображения времени
function genereteDate(data) {
  const ourDate = new Date(Date.now() + (data.timezone * 1000));
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  function formatTime(num) {
    if (String(num).length < 2) {
      return `0${num}`;
    }
    return num;
  }

  const resStr = `${formatTime(ourDate.getUTCHours())}:${formatTime(ourDate.getUTCMinutes())}
  - ${days[ourDate.getDay()]},
  ${ourDate.getUTCDate()}
  ${months[ourDate.getMonth()]}
  ${ourDate.getUTCFullYear()}`;

  return resStr;
}


// функция отрисовки фото
function changePhoto(dataPhoto) {
  photoTown.src = dataPhoto.hits[0]['largeImageURL'];
}

// функция фильтрации фото
function findPhoto(dataWeather) {
  console.log(dataWeather);
  const weather = dataWeather.weather[0].main;

  api.getPhoto(dataWeather)
    .then(dataPhoto => {
      if (dataPhoto.total !== 0) {
        changePhoto(dataPhoto);
      } else {
        api.getOtherPhoto(weather)
          .then(dataOtherPhoto => {
            changePhoto(dataOtherPhoto)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
}



// функция первичной отрисовки информации
function getFirstInfo() {
  navigator.geolocation.getCurrentPosition(position => {
      createdMap(position.coords.latitude, position.coords.longitude);
      api.getWeather(position.coords.latitude, position.coords.longitude)
        .then(data => {
          findPhoto(data);
          changeContent(data);
          getUserCity(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    function (error) {
      if (error.code == error.PERMISSION_DENIED) {
        api.getLocation()
          .then(data => {
            createdMap(data.latitude, data.longitude);
            api.getWeather(data.latitude, data.longitude)
              .then(data => {
                findPhoto(data);
                changeContent(data);
                getUserCity(data);
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  )
}


// функция обновления информации
function updateInfo(nameOfCity = cityName.textContent) {
  api.getAnotherWeather(nameOfCity)
    .then(data => {
      if (cityName.textContent !== data.name) {
        findPhoto(data);
        deleteMap();
        initMap(data.coord.lat, data.coord.lon);
      }
      changeContent(data);
    })
    .catch((err) => {
      console.log(err);
    })
}



// ---СЛУШАТЕЛИ СОБЫТИЙ---
searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let nameOfCity = document.querySelector('.add-info__input').value;
  updateInfo(nameOfCity);
  searchForm.reset();
});

addInfo.querySelectorAll('.add-info__list-el').forEach(item => {
  item.addEventListener("click", () => {
    updateInfo(item.textContent);
  })
})



// ---ДЕЙСТВИЯ ПРИ ЗАКГРУЗКЕ СТРАНИЦЫ---
const api = new Api();

// получаем данные при начальной загрузке страницы
getFirstInfo();

// обновляем данные каждые 30 сек
setInterval(updateInfo, 30000);

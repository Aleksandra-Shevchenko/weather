import Api from "../components/Api.js";

const mainCity = document.querySelector('.city');
const temperature = mainCity.querySelector('.city__tem');
const cityName = mainCity.querySelector('.city__name');
const weatherDesc = mainCity.querySelector('.city__descrip-weather');
const weatherIcon = mainCity.querySelector('.city__icon-weather');
const cityDate = mainCity.querySelector('.city__date');

const temFeelsLike = document.querySelector('.add-info__data_type_feels');
const wind = document.querySelector('.add-info__data_type_wind');
const humidity = document.querySelector('.add-info__data_type_humidity');
const userCity = document.querySelector('.add-info__list-el_type_main');
const precipitation = document.querySelector('.add-info__data_type_precipitation');

const photoTown = document.querySelector('.weather__pic');

const searchForm = document.querySelector('.add-info__form');


const api = new Api();




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



function getUserCity(data) {
  userCity.textContent = data.name;
}

function findPrecipitation(data) {
  if(!data.rain && !data.snow) {
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




function getFirstInfo() {
  api.getLocation()
    .then(data => {
      api.getWeather(data.latitude, data.longitude)
        .then(data => {
          findPhoto(data);
          changeContent(data);
          getUserCity(data);
        })
    })
    .catch((err) => {
      console.log(err);
    })
}


function changePhoto(dataPhoto) {
  photoTown.src = dataPhoto.hits[0]['largeImageURL'];
}

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

function updateInfo(nameOfCity = cityName.textContent) {
  api.getAnotherWeather(nameOfCity)
  .then(data => {
    if (cityName.textContent !== data.name) {
      findPhoto(data);
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



// ---ДЕЙСТВИЯ ПРИ ЗАКГРУЗКЕ СТРАНИЦЫ---
// получаем данные при начальной загрузке страницы
getFirstInfo();

// обновляем данные каждые 10 сек
setInterval(updateInfo, 10000);

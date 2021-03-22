import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import { createdMap, initMap, deleteMap } from "../components/ymap.js";


// ---ФУНКЦИИ---
// функция отображения данных на странице
function changeContent(data) {
  config.cityName.textContent = data.name;
  config.temperature.innerHTML = Math.round(data.main.temp) + '&deg;';
  config.weatherDesc.textContent = data.weather[0]['description'];
  config.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
  config.cityDate.textContent = genereteDate(data);
  config.temFeelsLike.innerHTML = Math.round(data.main.feels_like) + '&deg;';
  config.wind.textContent = `${data.wind.speed} м/с`;
  config.humidity.textContent = `${data.main.humidity}%`;
  config.precipitation.textContent = findPrecipitation(data);
}

// функция отображения города пользователя в панели слева
function getUserCity(data) {
  config.userCity.textContent = data.name;
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

  function formatTime(num) {
    if (String(num).length < 2) {
      return `0${num}`;
    }
    return num;
  }

  const resStr = `${formatTime(ourDate.getUTCHours())}:${formatTime(ourDate.getUTCMinutes())}
  - ${config.forDate.days[ourDate.getDay()]},
  ${ourDate.getUTCDate()}
  ${config.forDate.months[ourDate.getMonth()]}
  ${ourDate.getUTCFullYear()}`;

  return resStr;
}

// функция определения местоположения, при запрете от пользователя
function setLocation(error) {
  if (error.code == error.PERMISSION_DENIED) {
    api.getLocation()
      .then(data => {
        createdMap(data.latitude, data.longitude);
        return api.getWeather(data.latitude, data.longitude);
      })
      .then(data => {
        findPhoto(data);
        changeContent(data);
        getUserCity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// функция отрисовки фото
function changePhoto(dataPhoto) {
  config.photoTown.src = dataPhoto.hits[0]['largeImageURL'];
}

// функция фильтрации фото
function findPhoto(dataWeather) {
  const weather = dataWeather.weather[0].main;
  api.getPhoto(dataWeather)
    .then(dataPhoto => {
      if (dataPhoto.total !== 0) {
        changePhoto(dataPhoto);
      } else {
        api.getPhotoOnlyCity(dataWeather)
          .then(dataPhoto => {
            changePhoto(dataPhoto);
          })
          .catch(() => {
            api.getOtherPhoto(weather)
              .then(dataPhoto => {
                changePhoto(dataPhoto);
              });
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
      setLocation(error);
    }
  )
}

// функция обновления информации
function updateInfo(nameOfCity = config.cityName.textContent) {
  api.getAnotherWeather(nameOfCity)
    .then(data => {
      if (config.cityName.textContent !== data.name) {
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
config.searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let nameOfCity = document.querySelector('.add-info__input').value;
  updateInfo(nameOfCity);
  config.searchForm.reset();
});

config.addInfo.querySelectorAll('.add-info__list-el').forEach(item => {
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

// --- КЛАСС ДЛЯ ОТПРАВКИ ЗАПРОСОВ НА СЕРВЕР ---

export default class Api {
  constructor() {
    this._keyWeather = '14926d4323273168c22be818f4f8b491';
    this._mainUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    this._keyPhoto = '19932890-3440ea8c759315d97a3ef428e';
    this._photoUrl = 'https://pixabay.com/api/?key='
  }


  getLocation() {
    //делаем запрос на локализацию устройства
    return fetch('https://ipapi.co/json/')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getWeather(lat, lon) {
    //делаем запрос на погоду по кординатам
    return fetch(`${this._mainUrl}lat=${lat}&lon=${lon}&units=metric&appid=${this._keyWeather}&lang=ru`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getAnotherWeather(city) {
    //делаем запрос  на погоду в другом городе
    return fetch(`${this._mainUrl}q=${city}&units=metric&appid=${this._keyWeather}&lang=ru`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // &category=places

  getPhoto({ name, weather }) {
    //делаем запрос на фото по городу и погоде
    return fetch(`${this._photoUrl}${this._keyPhoto}&q=${name}+city+${weather[0].main}&lang=ru&image_type=photo&orientation=horizontal&category=places`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getOtherPhoto(weather) {
    //делаем запрос на фото только по погоде
    return fetch(`${this._photoUrl}${this._keyPhoto}&q=${weather}+weather&lang=ru&image_type=photo&orientation=horizontal&category=backgrounds`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getPhotoOnlyCity({ name }) {
    //делаем запрос на фото только по городу
    return fetch(`${this._photoUrl}${this._keyPhoto}&q=${name}+city&lang=ru&image_type=photo&orientation=horizontal&category=places`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

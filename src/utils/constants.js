export const config = {
  photoTown: document.querySelector('.container__pic'),
  mainCity: document.querySelector('.city'),
  temperature: document.querySelector('.city__tem'),
  cityName: document.querySelector('.city__name'),
  weatherDesc: document.querySelector('.city__descrip-weather'),
  weatherIcon: document.querySelector('.city__icon-weather'),
  cityDate: document.querySelector('.city__date'),
  addInfo: document.querySelector('.add-info'),
  searchForm: document.querySelector('.add-info__form'),
  temFeelsLike: document.querySelector('.add-info__data_type_feels'),
  wind: document.querySelector('.add-info__data_type_wind'),
  humidity: document.querySelector('.add-info__data_type_humidity'),
  userCity: document.querySelector('.add-info__list-el_type_main'),
  precipitation: document.querySelector('.add-info__data_type_precipitation'),
  forDate: {
    days:['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    months:['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
  }
}

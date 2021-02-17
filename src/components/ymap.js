let myMap;

export function createdMap(lat, lng) {
  const script = document.createElement('script');

  script.onload = () => {
    ymaps.ready(() => initMap(lat, lng));
  };

  script.id = 'ymaps';
  script.src = "https://api-maps.yandex.ru/2.1/?apikey=8d35dcd4-01c9-4da3-ac23-1daa50fa2b8c&lang=ru_RU";

  document.head.append(script);
}


export function initMap(lat, lng) {
  myMap = new ymaps.Map('map', {
    center: [lat, lng],
    zoom: 8,
    controls: [],

  });

  // Создание геообъекта с типом точка (метка)
  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [lat, lng]
    },
    properties: {}
  }, {
    preset: "islands#darkOrangeDotIcon",
  });

  myMap.geoObjects.add(myGeoObject);
}

export function deleteMap() {
  myMap.destroy();
}

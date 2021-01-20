
let map;

 export default function initMap(lat, lng) {
  let opt = {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: 7,
    disableDefaultUI: true,
    // zoomControl: true,
    // zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
    styles: [
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [{
            "visibility": "simplified"},
          { "color": "#e94f3f"}
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {"visibility": "on"},
          {"gamma": "0.50"},
          {"hue": "#ff4a00"},
          {"lightness": "-79"},
          {"saturation": "-86"}
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [{ "hue": "#ff1700"}]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [{ "visibility": "on"},
          { "hue": "#ff0000"}
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "color": "#e74231"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#4d6447"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
            "color": "#f0ce41"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [{
          "color": "#363f42"
        }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "color": "#231f20"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#6c5e53"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "color": "#313639"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
            "visibility": "simplified"
          },
          {
            "hue": "#ff0000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "color": "#0e171d"
        }]
      }
    ]
  }
  map = new google.maps.Map(document.getElementById('map'), opt);

  let marker = new google.maps.Marker({
    position: opt.center,
    map: map,
  })
}

import React, { Component } from 'react';
import './App.scss';

const places = [
  {
    "name": "Vevo Co-working Space",
    "image": "vevo-co-working-space.jpg",
    "address": "El-Mohandes El-Kordy, Maadi Al Khabiri Al Wasti, Al Maadi, Cairo, Egypt",
    "phone": "0101 273 2732",
    "lat": 29.9612892,
    "lng": 31.2483158,
    "facebook": "https://www.facebook.com/vevospace/",
    "rating": 3
  },
  {
    "name": "Fab Lab Egypt",
    "image": "fab-lab-egypt.jpg",
    "address": "Villa 35 - 100 st. - Near Al Horia Square, Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate",
    "phone": "0101 746 5650",
    "lat": 29.96175,
    "lng": 31.2492591,
    "facebook": "https://www.facebook.com/fablab.egypt/",
    "rating": 4
  },
  {
    "name": "Makanak Office Space",
    "image": "makanak-office-space.jpg",
    "address": "23 El-Nahda Street, 7 St, Maadi Sarayat, El Maleka Tower, Second Floor. Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate 11431",
    "phone": "0120 000 2092",
    "lat": 29.9601,
    "lng": 31.2532501,
    "facebook": "https://www.facebook.com/makanakoffice/",
    "rating": 5
  },
  {
    "name": "Vevo Co-working Space",
    "image": "vevo-co-working-space.jpg",
    "address": "El-Mohandes El-Kordy, Maadi Al Khabiri Al Wasti, Al Maadi, Cairo, Egypt",
    "phone": "0101 273 2732",
    "lat": 29.9612892,
    "lng": 31.2483158,
    "facebook": "https://www.facebook.com/vevospace/",
    "rating": 2
  },
  {
    "name": "Fab Lab Egypt",
    "image": "fab-lab-egypt.jpg",
    "address": "Villa 35 - 100 st. - Near Al Horia Square, Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate",
    "phone": "0101 746 5650",
    "lat": 29.96175,
    "lng": 31.2492591,
    "facebook": "https://www.facebook.com/fablab.egypt/",
    "rating": 1
  },
  {
    "name": "Makanak Office Space",
    "image": "makanak-office-space.jpg",
    "address": "23 El-Nahda Street, 7 St, Maadi Sarayat, El Maleka Tower, Second Floor. Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate 11431",
    "phone": "0120 000 2092",
    "lat": 29.9601,
    "lng": 31.2532501,
    "facebook": "https://www.facebook.com/makanakoffice/",
    "rating": 5
  }
]

var map;

class App extends Component {

  state = {
    places: places,
    placesInfo: {},
    lat: 29.96175,
    lng: 31.2492591,
    zoom: 14
  }

  componentDidMount() {
    this.renderMap();
    // this.getUserLocation();
  }
  
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDSeZUcFX7VMpbO6PrA57UR_J3__pl0f2c&callback=initMap");
    window.initMap = this.initMap;
  }

  initMap = () => {
    let {lat, lng} = this.state;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat, lng},
      zoom: 14
    });

    // Place Markers
    this.placeMarkers();
  }

  placeMarkers = () => {

    // Places Data
    let {places} = this.state;

    // Add `infowWindow`
    let infowindow = new window.google.maps.InfoWindow({
      content: ''
    })

    places.map(place => {

      // Add Marker
      var marker = new window.google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: place.name
      });

      // `infowWindow` content
      let content = `
        <div class='infowindow'>
        <img src='./images/${place.image}'/>
          <div class='details'>
            <h2>${place.name}</h2>
            <p class='location'><i class="fas fa-map-marker-alt"></i> ${place.address}</p>
          </div>
        </div>
      `;

      // Show `infoWindow` on Marker Click
      marker.addListener('click', function() {
        infowindow.close();
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });

    })
  }

  getUserLocation = () => {
    let x = document.querySelector('#location');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  showPosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      zoom: 25
    })
  }
  
  render() {
    return (
      <div className="App">        
        <div className="restaurants">

          {this.state.places.map((place, index) => (
            <div className="restaurant" key={index}>
              <img 
                src={'./images/' + place.image} 
                alt={place.name} 
                title={place.name}
              />
              <div className="details">
                <h2 className="name">{place.name}</h2>
                <div className="review">
                  <ul className={'stars rate-' + place.rating}>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                  </ul>
                </div>
                <ul className="info">
                  <li><a href={place.facebook}><i class="fab fa-facebook"></i></a></li>
                  <li><i className="fas fa-phone-alt"></i><a href={'tel:' + place.phone}>{place.phone}</a></li>
                  <li><i className="fas fa-map-marker-alt"></i> {place.address}</li>
                </ul>
              </div>
            </div>
            ))}
        </div>
        <div id="map"></div>
      </div>
    );
  }
}

function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;

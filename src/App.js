import React, { Component } from 'react';
import './App.scss';

const places = [
  {
     "name":"Bronco",
     "address":"39 Rue des Petites Écuries, 75010 Paris",
     "lat":48.8737815,
     "lng":2.3501649,
     "ratings":[
        {
           "stars":4,
           "comment":"Great! But not many veggie options."
        },
        {
           "stars":5,
           "comment":"My favorite restaurant!"
        }
     ]
  },
  {
     "name":"Babalou",
     "address":"4 Rue Lamarck, 75018 Paris",
     "lat":48.8865035,
     "lng":2.3442197,
     "ratings":[
        {
           "stars":5,
           "comment":"Tiny pizzeria next to Sacre Coeur!"
        },
        {
           "stars":3,
           "comment":"Meh, it was fine."
        }
     ]
  },
  {
    "name":"Bronco",
    "address":"39 Rue des Petites Écuries, 75010 Paris",
    "lat":48.8737815,
    "lng":2.3501649,
    "ratings":[
       {
          "stars":4,
          "comment":"Great! But not many veggie options."
       },
       {
          "stars":5,
          "comment":"My favorite restaurant!"
       }
    ]
  },
  {
    "name":"Babalou",
    "address":"4 Rue Lamarck, 75018 Paris",
    "lat":48.8865035,
    "lng":2.3442197,
    "ratings":[
       {
          "stars":5,
          "comment":"Tiny pizzeria next to Sacre Coeur!"
       },
       {
          "stars":3,
          "comment":"Meh, it was fine."
       }
    ]
  },
  {
    "name":"Bronco",
    "address":"39 Rue des Petites Écuries, 75010 Paris",
    "lat":48.8737815,
    "lng":2.3501649,
    "ratings":[
       {
          "stars":4,
          "comment":"Great! But not many veggie options."
       },
       {
          "stars":5,
          "comment":"My favorite restaurant!"
       }
    ]
  },
  {
    "name":"Babalou",
    "address":"4 Rue Lamarck, 75018 Paris",
    "lat":48.8865035,
    "lng":2.3442197,
    "ratings":[
       {
          "stars":5,
          "comment":"Tiny pizzeria next to Sacre Coeur!"
       },
       {
          "stars":3,
          "comment":"Meh, it was fine."
       }
    ]
  }
]

var map;

class App extends Component {

  state = {
    places: places,
    placesInfo: {},
    lat: 48.8865035,
    lng: 2.3442197,
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
          <img src='https://freight.cargo.site/w/750/i/32d0b948cde740a2404c2f38ba610633d2200c9757c50bba5a9d2114a4d740ad/DSC_0058.JPG' />
          <div class='details'>
            <h2>${place.name}</h2>
            <p class='location'><i class="fas fa-map-marker-alt"></i> ${place.address}</p>
          </div>
        </div>
      `

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
              <img src='https://freight.cargo.site/w/750/i/32d0b948cde740a2404c2f38ba610633d2200c9757c50bba5a9d2114a4d740ad/DSC_0058.JPG'/>
              <div className="details">
                <h2 className="name">{place.name}</h2>
                <div className="review">
                  <ul className="stars">
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                  </ul>
                </div>
                <ul className="info">
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

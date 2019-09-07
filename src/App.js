import React, { Component } from 'react';
import './App.scss';
import { thisExpression } from '@babel/types';
import { stringify } from 'querystring';

var map;

class App extends Component {

  state = {
    places: [],
    lat: -34.397,
    lng: 150.644,
    zoom: 8
  }

  componentDidMount() {
    this.renderMap();
    this.getUserLocation();
  }

  renderMap = () => {
    loadStyle("https://api.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css");
    loadScript("https://api.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.js");
    setTimeout(() => {
      this.initMap();
    }, 2000)
  }

  initMap = () => {
    let {lat, lng} = this.state;

    window.mapboxgl.accessToken = 'pk.eyJ1IjoieWFoeWFlbGhhcm9ueSIsImEiOiJjazA5aGJoYXIwODhkM25udnJtMWZ5cGtmIn0.jUekTZ-uMWs1sAcA7AQNrQ';

    map = new window.mapboxgl.Map({
      container: 'map', // HTML container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat], // starting position as [lng, lat]
      zoom: 12
    });
    
    const that = this;
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR&client_secret=CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0&v=20180323&limit=100&ll=${lat},${lng}&query=coffee`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.response.groups[0].items);
        that.setState({
          places: myJson.response.groups[0].items
        }, that.placeMarkers);
      })
      .catch(function(err) {
          console.log(err)
      });
  }

  placeMarkers = () => {    
    this.state.places.map(place => {
      var popup = new window.mapboxgl.Popup()
      .setHTML(`<h1>${place.venue.name}</h1><p>Location: ${place.venue.location.address}</p>`);

      var marker = new window.mapboxgl.Marker()
      .setLngLat([place.venue.location.lng, place.venue.location.lat])
      .setPopup(popup)
      .addTo(map);
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
        <div id="map"></div>
        <div className="restaurants">
          <div id="location">Lat: {this.state.lat}, <br/>Lng: {this.state.lng}</div>
        </div>
      </div>
    );
  }
}

function loadStyle(url) {
  let index  = window.document.getElementsByTagName("link")[0];
  let link = window.document.createElement("link");
  link.href = url;
  link.rel = 'stylesheet';
  index.parentNode.insertBefore(link, index);
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

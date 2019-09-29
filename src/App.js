import React, { Component } from 'react';
import './App.scss';

var map;

class App extends Component {

  state = {
    places: [],
    placesInfo: {},
    lat: 37.779635,
    lng: -122.418856,
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
      zoom: 8
    });
  }

  placeMarkers = () => {

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
          {/* <div className="restaurant" key={index}>
            <img src={imgUrl}/>
            <h2 className="name">{place.venue.name}</h2>
            <p>{review}</p>
            <ul className="info">
              <li><i className="fas fa-map-marker-alt"></i> {place.venue.location.formattedAddress[0]}, {place.venue.location.formattedAddress[1]}, {place.venue.location.formattedAddress[2]}</li>
              <li></li>
            </ul>
          </div> */}
        </div>
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

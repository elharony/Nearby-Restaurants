import React, { Component } from 'react';
import './App.scss';

var map = '';

class App extends Component {

  state = {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }

  componentDidMount() {
    this.renderMap();
    this.getUserLocation();
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom
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
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15
    })
  }
  
  render() {
    return (
      <div className="App">
        <div id="map"></div>
        <div className="restaurants">
          <div id="location">Lat: {this.state.center.lat}, Lng: {this.state.center.lng}</div>
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

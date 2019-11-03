import React, { Component } from 'react';

import './App.scss';
// import places from './places.js';

/** Components */
import Sidebar from './components/sidebar/sidebar';
import Map from './components/map/map';

const API_KEY =`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

var map;
var infowindow;
var service;

class App extends Component {

  state = {
    places: [],
    placesDetails: [],
    selectedPlace: 0,
    lat: 29.96175,
    lng: 31.2492591,
    zoom: 14
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {

    var location = {
      lat: this.state.lat,
      lng: this.state.lng
    };

    map = new window.google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12
    });

    var marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: "You're Here!"
    });

    var request = {
        location: location,
        radius: 1000,
        type: ['restaurant']
    }
    
    infowindow = new window.google.maps.InfoWindow();
    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);

    // var service = new window.google.maps.places.PlacesService(document.getElementById('map'));
    // service.getDetails({
    //   placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    // }, function (place, status) {
    //   console.log('Place details:', place);
    // });
    
  }

  callback = (results, status) => {
    let that = this;
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {

      // Add Markers
      // results.forEach(this.createMarker);

      // Get Places Details
      let placesInfo = [];
      let fields = ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'user_ratings_total', 'reviews', 'place_id', 'geometry'];

      results.map(place => {
        service.getDetails({placeId: place.place_id, fields}, function(placeInfo, status) {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {

            placesInfo.push(placeInfo);

            that.setState({
              placesDetails: placesInfo
            }, that.addMarkers(placesInfo))
          }
        })
      })
    }
  }

  addMarkers = (placesInfo) => {
    placesInfo.forEach(this.createMarker);
  }

  createMarker = (place) => {
    var placeLoc = place.geometry.location;
    var marker = new window.google.maps.Marker({
        map: map,
        icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new window.google.maps.Point(10, 10),
            scaledSize: new window.google.maps.Size(10, 17)
        },
        position: place.geometry.location
    });

    marker.addListener('click', function() {

      var request = {
          reference: place.reference
      };

      service.getDetails(request, function(details, status) {
        infowindow.setContent([
          details.name,
          details.formatted_address,
          details.website,
          details.rating,
          details.formatted_phone_number].join("<br />"));

        infowindow.open(map, marker);        
      });

    })
  }

  getCurrentLocation = () => {
    let infoWindow = new window.google.maps.InfoWindow;

    let handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('My Location!');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        this.handleLocationError(true, infoWindow, map.getCenter());
      })
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          placesDetails={this.state.placesDetails} 
          openModal={this.openModal}
          openReviewModal={this.openReviewModal}
          openPlaceModal={this.openPlaceModal}
          handleSort={this.handleSort}
        />
        <Map />
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

/**
 * Features
 * --------
 * - Filter by Rating
 * - Add new Co-Working Space 
 * 
 * First mentor to be chosen Software Architect Path at OC, it's a Master Degree!
 * I was raised in Communist Europe, and it wasn't flowers. 
 */

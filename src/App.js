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
    lat: 48.859514,
    lng: 2.299105,
    zoom: 17
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {

    // Default Location
    var location = {
      lat: this.state.lat,
      lng: this.state.lng
    };

    // Initialize Map
    map = new window.google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 17
    });

    // Current Location Marker
    var marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: "You're Here!"
    });

    // Ask for user location
    // this.getCurrentLocation();

    // Request Info: It will be used for Google Places API `PlacesServices` to get certain places that match our criteria
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

      let placesInfo = [];
      let fields = ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'user_ratings_total', 'reviews', 'photo', 'place_id', 'geometry'];
      
      // Get Places Details
      results.map(place => {
        service.getDetails({placeId: place.place_id, fields}, function(placeInfo, status) {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {

            // Add New Place
            placesInfo.push(placeInfo);

            // Update All Places & Add Markers
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
    var marker = new window.google.maps.Marker({
        map: map,
        icon: {
            url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
            anchor: new window.google.maps.Point(10, 10),
            scaledSize: new window.google.maps.Size(20, 20)
        },
        position: place.geometry.location
    });

    marker.addListener('click', function() {

      var request = {
          reference: place.reference
      }

      let placePicture = place.photos ? place.photos[0].getUrl({maxWidth: 300, maxHeight: 300}) : 'https://via.placeholder.com/300';

      let content = `
        <h2>${place.name}</h2>
        <img src=${placePicture}>
        <ul>
          <li>${place.formatted_address}</li>
          <li>${place.formatted_phone_number}</li>
        </ul>
      `;
      infowindow.setContent(content);
      infowindow.open(map, marker);        

    })
  }

  getCurrentLocation = () => {
    let self = this;
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

        self.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

        self.initMap();
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      })
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  handleSort = (e) => {
    let sortedPlaces = this.state.placesDetails;
    let sortOrder = e.target.value;

    if(sortOrder === 'desc') { // Highest to lowest
      sortedPlaces.sort(function (a, b) {
        console.log('desc');
        return b.rating - a.rating;
      })
    } else {
      sortedPlaces.sort(function (a, b) {
        console.log('asc');
        return a.rating - b.rating;
      })
    }

    this.setState({
      placesDetails: sortedPlaces
    })
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

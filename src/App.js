import React, { Component } from 'react';

import './App.scss';

import Sidebar from './components/sidebar/sidebar';
import Map from './components/map/map';

const API_KEY =`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

var map;
var infowindow;
var service;

class App extends Component {

  state = {
    placesDetails: [],
    sortedPlacesDetails: [],
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
        zoom: 15,
        styles: mapStyle
    });

    // Current Location Marker
    var marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: "You're Here!"
    });

    // Ask for user location
    this.getCurrentLocation();

    // Request Info: It will be used for Google Places API `PlacesServices` to get certain places that match our criteria
    var request = {
        location: location,
        radius: 500,
        type: ['restaurant']
    }
    
    infowindow = new window.google.maps.InfoWindow();
    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);
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
              placesDetails: placesInfo,
              sortedPlacesDetails: placesInfo
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
        title: place.name,
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
        infoWindow.setContent("You're here!");
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
    let places = this.state.placesDetails;
    let sortedPlaces = [];
    let minRating = e.target.value;

    places.map(place => {
      console.log(place.rating);
      if(place.rating >= minRating) {
        sortedPlaces.push(place);
      }
    })

    this.setState({
      sortedPlacesDetails: sortedPlaces
    });

    // Reset sortedPlaces for future sorting
    sortedPlaces = [];
  }

  addPlace = (newPlace) => {
    let currentPlaces = this.state.placesDetails;
    currentPlaces.push(newPlace);

    let placeMarker = () => {
      // Position
      let latLng = {
        lat: newPlace.lat,
        lng: newPlace.lng
      }

      // Add Marker
      var marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: newPlace.name,
        icon: {
          url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
          anchor: new window.google.maps.Point(10, 10),
          scaledSize: new window.google.maps.Size(20, 20)
        }
      });
      marker.setMap(map);
      map.setCenter(latLng);

      // InfoWindow
      marker.addListener('click', function() {
        let placePicture = newPlace.photos ? newPlace.photos[0].getUrl({maxWidth: 300, maxHeight: 300}) : 'https://via.placeholder.com/300';

        let content = `
          <h2>${newPlace.name}</h2>
          <img src=${placePicture}>
          <ul>
            <li>${newPlace.formatted_address}</li>
            <li>${newPlace.formatted_phone_number}</li>
          </ul>
        `;
        infowindow.setContent(content);
        infowindow.open(map, marker);     
      })
    }

    this.setState({
      placesDetails: currentPlaces
    }, placeMarker())

    console.log(newPlace.lat, newPlace.lng)
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          placesDetails={this.state.sortedPlacesDetails} 
          handleSort={this.handleSort}
          addPlace={this.addPlace}
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
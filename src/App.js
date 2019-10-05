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
    "rating": 3,
    "reviews": [
      {
        "review_user": "Vevo Last 1",
        "review_text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, porro!",
        "review_rate": 4
      },
      {
        "review_user": "Vevo Last 2",
        "review_text": "Ullam nesciunt iure dolores, nemo aperiam alias atque quos eum necessitatibus ex.",
        "review_rate": 3
      },
      {
        "review_user": "Vevo Last 3",
        "review_text": "Earum temporibus amet dicta excepturi repellendus quo rerum doloremque, beatae illum optio? Vero cum saepe corrupti!",
        "review_rate": 5
      }
    ]
  },
  {
    "name": "Fab Lab Egypt",
    "image": "fab-lab-egypt.jpg",
    "address": "Villa 35 - 100 st. - Near Al Horia Square, Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate",
    "phone": "0101 746 5650",
    "lat": 29.96175,
    "lng": 31.2492591,
    "facebook": "https://www.facebook.com/fablab.egypt/",
    "rating": 4,
    "reviews": [
      {
        "review_user": "Fab Lab Last 1",
        "review_text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, porro!",
        "review_rate": 4
      },
      {
        "review_user": "Fab Lab Last 2",
        "review_text": "Ullam nesciunt iure dolores, nemo aperiam alias atque quos eum necessitatibus ex.",
        "review_rate": 3
      },
      {
        "review_user": "Fab Lab Last 3",
        "review_text": "Earum temporibus amet dicta excepturi repellendus quo rerum doloremque, beatae illum optio? Vero cum saepe corrupti!",
        "review_rate": 5
      }
    ]
  },
  {
    "name": "Makanak Office Space",
    "image": "makanak-office-space.jpg",
    "address": "23 El-Nahda Street, 7 St, Maadi Sarayat, El Maleka Tower, Second Floor. Maadi, Maadi Al Khabiri Ash Sharqeyah, Cairo, Cairo Governorate 11431",
    "phone": "0120 000 2092",
    "lat": 29.9601,
    "lng": 31.2532501,
    "facebook": "https://www.facebook.com/makanakoffice/",
    "rating": 3,
    "reviews": [
      {
        "review_user": "Makanak Last 1",
        "review_text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, porro!",
        "review_rate": 4
      },
      {
        "review_user": "Makanak Last 2",
        "review_text": "Ullam nesciunt iure dolores, nemo aperiam alias atque quos eum necessitatibus ex.",
        "review_rate": 3
      },
      {
        "review_user": "Makanak Last 3",
        "review_text": "Earum temporibus amet dicta excepturi repellendus quo rerum doloremque, beatae illum optio? Vero cum saepe corrupti!",
        "review_rate": 5
      }
    ]
  }
]
var map;

class App extends Component {

  state = {
    places: places,
    selectedPlace: 0,
    lat: 29.96175,
    lng: 31.2492591,
    zoom: 14
  }

  componentDidMount() {
    this.renderMap();
    // this.getUserLocation();
  }
  
  renderMap = () => {
    // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDSeZUcFX7VMpbO6PrA57UR_J3__pl0f2c&callback=initMap");
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

    // Cache
    let {places} = this.state;

    // Add `infowWindow`
    let infowindow = new window.google.maps.InfoWindow({
      content: ''
    })

    // Place Markers
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

  // Modal
  openModal = (placeIndex) => {
    let modal = document.querySelector('.modal');
    modal.classList.add('open');
    
    // Update `Selected Place`
    this.setState({
      selectedPlace: placeIndex
    })
  }
  closeModal = () => {
    let modal = document.querySelector('.modal');
    modal.classList.remove('open');
  }
  
  render() {
    return (
      <div className="App">        
        <div className="restaurants">
          {
            this.state.places.map((place, index) => {
              return (
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
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                      </ul>
                      <span className="all-reviews" onClick={(e) => this.openModal(index)}>Show All</span>
                      <span className="add-review">Add Review</span>
                    </div>
                    <ul className="info">
                      <li>
                        <a href={place.facebook}><i className="fab fa-facebook"></i></a>
                      </li>
                      <li><i className="fas fa-phone-alt"></i><a href={'tel:' + place.phone}>{place.phone}</a></li>
                      <li><i className="fas fa-map-marker-alt"></i> {place.address}</li>
                    </ul>
                  </div>

                </div>
              )
            })
          }
        </div>
        <div id="map"></div>
        <div className="modal">
          <div className="inner">
            <span className="close" id="close-modal" onClick={this.closeModal}>X</span>
            <div className="review-list">

            {
              this.state.places[this.state.selectedPlace].reviews.map((review, index) => (
                <div className="review" key={index}>
                  <div className="review-info">
                    <h3>{review.review_user}</h3>
                    <ul className={'stars rate-' + review.review_rate}>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                    </ul>
                    <p>{review.review_text}</p>
                  </div>
                </div>
              ))
            }
              
            </div>
          </div>
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

/**
 * Features
 * --------
 * - Filter by Rating
 * - Add new Co-Working Space 
 * 
 * First mentor to be chosen Software Architect Path at OC, it's a Master Degree!
 * I was raised in Communist Europe, and it wasn't flowers. 
 */

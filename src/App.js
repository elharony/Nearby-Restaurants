import React, { Component } from 'react';
import './App.scss';
import places from './places.js';

var map;

class App extends Component {

  state = {
    places: places.places,
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

  // Show All Reviews
  openModal = (placeIndex) => {
    let modal = document.querySelector('#all-reviews-modal');
    modal.classList.add('open');
    
    // Update `Selected Place`
    this.setState({
      selectedPlace: placeIndex
    })
  }
  closeModal = () => {
    let modal = document.querySelector('#all-reviews-modal');
    modal.classList.remove('open');
  }

  // Add Review
  openReviewModal = (placeIndex) => {
    let modal = document.querySelector('#add-review-modal');
    modal.classList.add('open');

    // Update `Selected Place`
    this.setState({
      selectedPlace: placeIndex
    })
  }
  closeReviewModal = () => {
    let modal = document.querySelector('#add-review-modal');
    modal.classList.remove('open');
  }
  addReview(e) {
    let {places, selectedPlace} = this.state;

    // Stop redirect
    e.preventDefault();

    // Cache user inputs
    let userFullname = document.querySelector('#user-fullname').value;
    let userRating = document.querySelector('#user-rating').value;
    let userReview = document.querySelector('#user-review').value;

    // Inject the new review to the selected place
    let newReview = {
      "review_user": userFullname,
      "review_text": userReview,
      "review_rate": userRating
    }
    this.setState(prevState => {
      const newPlaces = [...prevState.places];
      newPlaces[selectedPlace].reviews.push(newReview);
      return {places: newPlaces};
    })

    // Close the popup modal
    this.closeReviewModal();
  }
  openPlaceModal = () => {
    let modal = document.querySelector('#add-place-modal');
    modal.classList.add('open');
  }
  closePlaceModal = () => {
    let modal = document.querySelector('#add-place-modal');
    modal.classList.remove('open');
  }
  addPlace(e) {
    let {places} = this.state;

    // Stop redirect
    e.preventDefault();

    // Cache user inputs
    let placeTitle = document.querySelector('#place-title').value;
    let placeAddress = document.querySelector('#place-address').value;
    let placeLat = document.querySelector('#place-lat').value;
    let placeLng = document.querySelector('#place-lng').value;
    let placePhone = document.querySelector('#place-phone').value;
    let placeRate = document.querySelector('#place-rate').value;

    // Inject the new review to the selected place
    let newPlace = {
      "name": placeTitle,
      "image": '',
      "address": placeAddress,
      "phone": placePhone,
      "lat": placeLat,
      "lng": placeLng,
      "rating": placeRate,
      "reviews": []
    }
    
    this.setState(prevState => {
      const newPlaces = [...prevState.places];
      newPlaces.push(newPlace);
      return {places: newPlaces};
    })

    // Close the popup modal
    this.closePlaceModal();
  }

  
  render() {
    return (
      <div className="App">
        <div className="aside">
          <div className="options">
            <div className="sort">
              Sort by Rate: <select id="sortby">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button class="cta" onClick={this.openPlaceModal}>Add New Place</button>
          </div>
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
                      <span className="add-review" onClick={(e) => this.openReviewModal(index)}>Add Review</span>
                    </div>
                    <ul className="info">
                      {/* <li>
                        <a href={place.facebook}><i className="fab fa-facebook"></i></a>
                      </li> */}
                      <li><i className="fas fa-phone-alt"></i><a href={'tel:' + place.phone}>{place.phone}</a></li>
                      <li><i className="fas fa-map-marker-alt"></i> {place.address}</li>
                    </ul>
                  </div>

                </div>
              )
            })
          }
        </div>
        </div>
        <div id="map"></div>
        <div className="modal" id="all-reviews-modal">
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
        <div className="modal" id="add-review-modal">
          <div className="inner">
            <span className="close" id="close-add-review-modal" onClick={this.closeReviewModal}>X</span>
            <form id="add-review-form" onSubmit={(e) => this.addReview(e)}>
              <div className="input-wrap">
                <label htmlFor="user-fullname">Full Name:</label>
                <input type="text" id="user-fullname" placeholder="John Doe" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="user-rating">Rate:</label>
                <select id="user-rating" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="input-wrap">
                <label htmlFor="user-review">Review:</label>
                <textarea id="user-review" cols="30" rows="3" placeholder="Review..."></textarea>
              </div>
              <div className="input-wrap">
                <button type="submit">Add Review</button>
              </div>
            </form>
          </div>
        </div>
        <div className="modal" id="add-place-modal">
          <div className="inner">
            <span className="close" id="close-add-place-modal" onClick={this.closePlaceModal}>X</span>
            <form id="add-place-form" onSubmit={(e) => this.addPlace(e)}>
              <div className="input-wrap">
                <label htmlFor="place-title">Place Title:</label>
                <input type="text" id="place-title" placeholder="Makannak Co-Working Space" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="place-address">Address:</label>
                <input type="text" id="place-address" placeholder="Villa 90 - Near Al Horia Square, Maadi, Cairo, Egypt" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="place-lat">Latitude:</label>
                <input type="text" id="place-lat" placeholder="29.9612892" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="place-lng">Longitude:</label>
                <input type="text" id="place-lng" placeholder="31.2483158" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="place-phone">Phone:</label>
                <input type="tel" id="place-phone" placeholder="01112134515" required/>
              </div>
              <div className="input-wrap">
                <label htmlFor="place-rate">Rating:</label>
                <select id="place-rate" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="input-wrap">
                <button type="submit">Add New Place</button>
              </div>
            </form>
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

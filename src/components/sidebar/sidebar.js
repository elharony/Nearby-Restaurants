import React, {Component} from 'react';
import './sidebar.scss';
import { places } from '../../places';

class Sidebar extends Component {

    state = {
        selectedPlace: 0
    }

    updateSelectedPlace = (modal, index) => {

        if(modal === 'all-reviews') {
            this.setState({
                selectedPlace: index
            }, this.toggleModal)
        } else if(modal === 'add-review') {
            this.setState({
                selectedPlace: index
            }, this.showAddReviewModal)
        }
    }

    toggleModal = () => {
        let allReviewsModal = document.querySelector('#all-reviews');
        allReviewsModal.classList.toggle('open');
    }

    showAddReviewModal = () => {
        let addReviewsModal = document.querySelector('#add-review');
        addReviewsModal.classList.add('open');
    }

    hideAddReviewModal = () => {
        let addReviewsModal = document.querySelector('#add-review');
        addReviewsModal.classList.remove('open');
    }

    addReview = (e) => {

        // // Stop Form Submission
        // e.preventDefault();
        
        // User Input
        let reviewUser = document.querySelector('#review-user').value;
        let reviewText = document.querySelector('#review-text').value;
        let reviewRate = document.querySelector('#review-rate').value;
        let reviewDate = new Date().getTime();

        // Add Review
        let review = {
            author_name: reviewUser,
            author_url: '#',
            profile_photo_url: 'https://via.placeholder.com/50',
            rating: reviewRate,
            text: reviewText,
            time: reviewDate
        }
        this.props.placesDetails[this.state.selectedPlace].reviews.push(review);
    }

    render() {

        let {placesDetails, handleSort} = this.props;

        return (
            <div className="sidebar">
                <div className="options">
                    <div className="sort">
                        Sort by: <select id="sortby" onChange={handleSort}>
                            <option value="">Randomaly</option>
                            <option value='desc'>Reviews: Best to Poor</option>
                            <option value='asc'>Reviews: Poor to Best</option>
                        </select>
                    </div>
                    <button className="cta">Add New Place</button>
                </div>
                <div className="places">
                    {
                        placesDetails.map((place, index) => (
                            <div className="place" key={index}>
                                <div className="details">
                                    <h2 className="name">{place.name}</h2>
                                    <div className="review">
                                        <ul className={'stars rate-' + Math.round(place.rating)}>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                        </ul>
                                        <span className="all-reviews" onClick={() => this.updateSelectedPlace('all-reviews', index)}>({place.user_ratings_total})</span> 
                                        <span className="add-review" onClick={() => this.updateSelectedPlace('add-review', index)}>Add Review</span>
                                        {/* <span className="add-review" onClick={(e) => openReviewModal(index)}>Add Review</span> */}
                                    </div>
                                    <ul className="info">
                                        <li><i className="fas fa-phone-alt"></i><a href={'tel:' + place.formatted_phone_number}>{place.formatted_phone_number}</a></li>
                                        <li><i className="fas fa-map-marker-alt"></i> {place.formatted_address}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>


                <div className="modal reviews" id="all-reviews">
                    <div className="inner">
                        <div className="close" onClick={this.toggleModal}>X</div>
                        <div className="review-list">
                            {placesDetails[0] ? placesDetails[this.state.selectedPlace].reviews.map(review => (
                                <div className="review">
                                    <div className="author">
                                        <img 
                                            src={review.profile_photo_url} 
                                            alt={review.author_name}
                                            title={review.author_name}
                                            className="author-thumbnail"
                                        />
                                        <ul className="author-info">
                                            <li><a href={review.author_url} target="_blank">{review.author_name}</a></li>
                                            <li>
                                                <ul className={'stars rate-' + Math.round(review.rating)}>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                </ul>
                                                <time>{review.relative_time_description}</time>
                                            </li>
                                        </ul>
                                    </div>
                                    <p class="text">{review.text}</p>
                                </div>
                            )) : (<div>Nothing!</div>)}
                        </div>
                    </div>
                </div>
            
                <div className="modal add-review" id="add-review">
                    <div className="inner">
                        <div className="close" onClick={this.hideAddReviewModal}>X</div>
                        <form action="" onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="review-user">Full Name</label>
                                <input type="text" id="review-user" placeholder="Ex. John Doe" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="review-rate">Rating</label>
                                <select id="review-rate" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="review-text">Review</label>
                                <textarea id="review-text" cols="30" rows="10" placeholder="Write your review..." required></textarea>
                            </div>
                            <button onClick={this.addReview}>Add Review</button>
                        </form>
                    </div>
                </div>
                                
            </div>
        )
    }
}

export default Sidebar;
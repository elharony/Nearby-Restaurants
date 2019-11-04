import React, {Component} from 'react';
import './sidebar.scss';
import { places } from '../../places';

class Sidebar extends Component {

    state = {
        selectedPlace: 0
    }

    selectedPlace = (index) => {
        this.setState({
            selectedPlace: index
        }, this.toggleAllReviews)
    }

    toggleAllReviews = () => {
        let allReviewsModal = document.querySelector('#all-reviews');
        allReviewsModal.classList.toggle('open');
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
                                    <p>Rating: {place.rating}</p>
                                    <div className="review">
                                        <ul className={'stars rate-' + Math.round(place.rating)}>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                            <li><i className="fas fa-star"></i></li>
                                        </ul>
                                        <span className="all-reviews">({place.user_ratings_total})</span> <span onClick={() => this.selectedPlace(index)}>Show All</span>
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
                        <div className="close" onClick={this.toggleAllReviews}>X</div>
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
            </div>
        )
    }
}

export default Sidebar;
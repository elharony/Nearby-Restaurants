import React, {Component} from 'react';
import './sidebar.scss';

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar">
                <div className="options">
                    <div className="sort">
                        Sort by: <select id="sortby">
                        <option value="desc">Reviews: Best to Poor</option>
                        <option value="asc">Reviews: Poor to Best</option>
                        </select>
                    </div>
                    <button className="cta">Add New Place</button>
                </div>
                <div className="places">
                    {
                        this.props.placesDetails.map((place, index) => (
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
                                        <span className="all-reviews">({place.user_ratings_total})</span>
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
            </div>
        )
    }
}

export default Sidebar;
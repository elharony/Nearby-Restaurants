import React, {Component} from 'react';
import './sidebar.scss';

class Sidebar extends Component {
    render() {

        let {places, openModal, openReviewModal, openPlaceModal, handleSort} = this.props;

        return (
            <div className="sidebar">
                <div className="options">
                    <div className="sort">
                        Sort by: <select id="sortby" onChange={(e) => handleSort(e.target.value)}>
                        <option value="desc">Reviews: Best to Poor</option>
                        <option value="asc">Reviews: Poor to Best</option>
                        </select>
                    </div>
                    <button className="cta" onClick={openPlaceModal}>Add New Place</button>
                </div>
                <div className="places">
                    {
                        places.map((place, index) => {
                            return (
                                <div className="place" key={index}>
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
                                            <span className="all-reviews" onClick={(e) => openModal(index)}>Show All</span>
                                            <span className="add-review" onClick={(e) => openReviewModal(index)}>Add Review</span>
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
        )
    }
}

export default Sidebar;
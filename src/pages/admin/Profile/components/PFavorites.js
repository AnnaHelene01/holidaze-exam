import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorites } from '../../../../state/favorites/favoriteSlice';
import { Col } from 'react-bootstrap';


const PFavorites = () => {
  //Favorites:
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  console.log(favorites);

  const handleRemove = (venueId) => {
    dispatch(removeFavorites(venueId));
  };
  
  return (
    <>
      {favorites.venues.map((venue) => (
        <Col key={venue.id} className='mb-4'>
          <div className="venue-box">
            {venue.media && (
              <img src={venue.media} alt="image-description" />
            )}
            <div className="venue-box-overlay d-flex">
              <h5>{venue.name}</h5>
              <button onClick={() => handleRemove(venue.id)} className='edit-btn'>Remove</button>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default PFavorites;

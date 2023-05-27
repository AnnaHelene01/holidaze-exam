import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { apiURL, holidazeVenues } from '../../../../utils/constants';
import placeholderImg from '../../../../assets/placeholder.png';

const VenueCard = ({venue}) => {
    const userName = JSON.parse(localStorage.getItem('username'));

    async function deletePost () {
        const url = `${apiURL}${holidazeVenues}/${venue.id}`;
         try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken"));
            const options = {
                method: 'DELETE', 
                headers : {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await fetch(url, options); 
            if (response.status === 204) {
                window.location = `/admin/venues/${userName}`;
              }    } catch(error) {
             console.warn(error);
        }
    }

  return (
    <>
      <div className="venue-box">
        <img src={venue?.media?.[0] || placeholderImg} alt={venue.description} />
        <div className="venue-box-overlay d-flex">
        <Link to={`/venue/${venue.id}`} className='text-decoration-none text-white'>
          <h5>{venue.name}</h5>
        </Link>
          <div className="btn-group">
              <button 
              className="edit-btn"
              onClick={deletePost}
              > <AiFillDelete /> </button>
           <Link
            to={{
                pathname: `/admin/editvenue/${venue.id}`,
                state: { venue },
            }}
            >
              <button className="edit-btn">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default VenueCard;

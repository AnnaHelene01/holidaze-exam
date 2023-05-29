import React from 'react'
import useApi from '../../../../hooks/useApi';
import { apiURL, holidazeVenues } from '../../../../utils/constants';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './popular.css'
import Loader from '../../../../components/Loader';

const PopularVenue= ({ venueId, index }) => {

    const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '/' + venueId);

    if (isLoading) {
        <Loader />
    }

    if (isError) {
        <h1>Im sorry, an error has occured! Try later</h1>
    }
    //format the index as 2-digit number
    const formatIndex = (num) => {
        return num.toString().padStart(2, '0');
    };

  return (
    <>
        <div key={dataValues.id} data-aos="fade-up" className="singleDestination">
            <div className="destImage">
                 <img src={dataValues.media} alt={dataValues.name} />
                <div className="overlayInfo">
                    <h3> {dataValues?.name} </h3>
                    <p> {dataValues?.location?.country} </p>
                    <Link to={`/venue/${venueId}`}>
                        <BsArrowRightShort className='overlay-icon'/>
                    </Link>
                </div>
            </div>
            <div className="destFooter">
                <div className="number">
                   {formatIndex(index + 1)} {/* Add the formatted index */}
                </div>
                <div className="destText flex">
                <h6> {dataValues?.location?.country} </h6> 
                </div>
            </div>      
        </div>
    </>
  )
};

export default PopularVenue;
  
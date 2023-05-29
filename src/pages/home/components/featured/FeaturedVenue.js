import React from 'react'
import useApi from '../../../../hooks/useApi';
import { apiURL, holidazeVenues } from '../../../../utils/constants';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdAirportShuttle, MdBathtub, MdKingBed, MdLocationOn, MdOutlineEmojiFoodBeverage, MdPets } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa';
import './featured.css'
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const FeaturedVenue = ({ venueId }) => {

    const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '/' + venueId);

  return (
    <>
        <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
            <div className="destImage">
              <img src={dataValues?.media?.[0]} alt={dataValues.name} />

             <span className="discount">
              30% Off
             </span>
            </div>

              <div className="offerBody">
                <div className="price flex">
                  <h4>
                    {dataValues?.name}
                  </h4>
                  <span className="status">
                    {dataValues?.price}$ / night
                  </span>
                </div>

                <div className="amenities flex">
                   <div className='d-flex'>
                        {dataValues?.meta?.wifi && (
                            <div className="meta-box">
                            <AiOutlineWifi className='meta-icon'/>
                            <div className="meta-text">Wifi</div>
                            </div>
                        )}
                        {dataValues?.meta?.parking && (
                            <div className="meta-box">
                            <AiFillCar className='meta-icon'/>
                            <div className="meta-text">Parking</div>
                            </div>
                        )}
                        {dataValues?.meta?.breakfast && (
                            <div className="meta-box">
                            <MdOutlineEmojiFoodBeverage className='meta-icon'/>
                            <div className="meta-text">Breakfast</div>
                            </div>
                        )}
                        {dataValues?.meta?.pets && (
                            <div className="meta-box">
                            <MdPets className='meta-icon'/>
                            <div className="meta-text">Pets</div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="location flex">
                    <MdLocationOn className="icon"/>
                    <small>{dataValues?.location?.address}, {dataValues?.location?.city}</small> 
                </div>
                <Link to={`/venue/${venueId}`} className='text-decoration-none'>
                    <button className='offer-btn flex'>View Details <BsArrowRightShort className='icon'/></button>
                </Link>
              </div>
            </div>    

           
    </>
  )
};

export default FeaturedVenue;

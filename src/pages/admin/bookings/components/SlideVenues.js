import React from 'react';
import '../bookings.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholderImg from '../../../../assets/placeholder.png'

const SlideVenues = ({ bookings, setSelectedVenue }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className='venue-container'>
   
      <Slider {...settings}>
        {bookings?.map(booking => (
          <div 
          className='venue-item' 
          key={booking.id}
          onClick={() => setSelectedVenue(booking)}
          >
            <img src={booking?.media?.[0] || placeholderImg} alt={booking.name} />
            <div className='venue-overlay'>
              <p>{booking.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideVenues;

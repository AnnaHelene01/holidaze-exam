import React, { useState } from 'react';
import './media.css'
import Carousel from 'react-bootstrap/Carousel';

const MediaCarousel = ({ media, name, placeholderImg }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  };

  return (
    <Carousel className='media-container' activeIndex={index} onSelect={handleSelect}>
      {media.map((imageUrl, index) => (
        <Carousel.Item key={index} className="w-100">
          <img
            className="w-100"
            src={imageUrl}
            alt={name}
            onError={(e) => {
              e.target.src = placeholderImg;
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MediaCarousel;
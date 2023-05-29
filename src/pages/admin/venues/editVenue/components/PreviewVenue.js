import React from 'react'
import { Card } from 'react-bootstrap';
import placeholderImg from '../../../../../assets/placeholder.png';
import { AiFillStar, AiOutlineUser } from 'react-icons/ai';

const PreviewVenue = ({  name, description, price, media, maxGuests, address}) => {
  return (
    <>
      <Card className='w-75 m-auto'>
            <Card.Img 
            variant='top'
            src={media}
            alt={description}
            style={{ height: "180px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = placeholderImg;
            }} 
            />
            <Card.Body className='mt-4'>
              <h3>{name}</h3>
              <p>{description}</p>
              <p>{price} / NOK per night</p>
              <p>Max guests: {maxGuests}</p>
              <p>{address}</p>
            </Card.Body>
      </Card>
    </>
  )
};

export default PreviewVenue;



  
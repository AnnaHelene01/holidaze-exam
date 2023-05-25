import React, { useState } from 'react'
import './venue.css'
import Media from './components/Media'
import useApi from '../../hooks/useApi';
import { apiURL, holidazeVenues } from '../../utils/constants';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AiFillCar, AiFillStar, AiOutlineWifi } from 'react-icons/ai';
import { MdOutlineEmojiFoodBeverage, MdPets } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import Owner from './components/Owner';
import BookNow from './components/BookNow';
import LoginToBook from './components/LoginToBook';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Venue = () => {

  const { venueId } = useParams()
  const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + "/" + venueId + "?_owner=true" + "&_bookings=true");
  const accessToken = localStorage.getItem('accessToken');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [show, setShow] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  // console.log(showConfirmation)

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    window.location.href = "/"
  };
  // const handleShowConfirmation = () => setShowConfirmation(true);
  



  const profileName = JSON.parse(localStorage.getItem('username'));
  //console.log("ProfileName: ", profileName);
 

  const handleClose = () => {
    setShow(false);
       setShowConfirmation(!showConfirmation);
      //  console.log(showConfirmation);
  };

  const handleClickClose = () => {
    setShow(false);
      //  console.log(showConfirmation);
  };

  const handleShow = () => {
    setShow(true);
    
  
  // console.log(showConfirmation)
  };

  
  

  if(isLoading){
    return <h1 className='text-center'>I am Loading...</h1>
  }

  if(isError){
    return <h1 className='text-center'>An error had occured</h1>
  }

  const { name, description = '', price, meta, rating, maxGuests, owner, location } = dataValues;
  //console.log(dataValues);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription = description.split(' ').slice(0, 20).join(' ');
  const fullDescription = description.split(' ').slice(20).join(' ');

  // Convert meta object to array
  const facilities = Object.entries(meta || {})
    .map(([key, value]) => ({ name: key, value }));

   

  return (
    <>
    <main className='main-padding'>
     <Container className='mt-5 venue-container'>
        <Row>
            <Col sm="12" md="8" lg="8" className='media-col mb-4'>
                <Media />
            </Col>
            <Col className='sm:mt-5' >
                <h1 className='mb-4'>{name}</h1>

              <p className='mb-4'>
                {showFullDescription ? description : shortDescription}{' '}
                {description.split(' ').length > 20 && (
                  <span className='primary' onClick={toggleDescription}>
                    {showFullDescription ? 'Read less' : 'Read more'}
                  </span>
                )}
              </p>

                <div className='d-flex max-guests mt-4'>
                    <AiFillStar className='rating-star'/>
                    <p>{rating}</p>
                </div>
                <div className='max-guests mt-4'>
                    <BsFillPeopleFill className='max-guests-icon'/>
                    <p>{maxGuests} Max Guests</p>
                </div>
                <p className='mt-4'>
                {price} NOK / night
                </p>
                  {accessToken && owner?.name === profileName ? (
                  <Link to={`/admin/venues/${profileName}`}>
                    <button className='btn-booknow'>
                      MANAGE
                    </button>
                  </Link>
                ) : accessToken ? (
                  <button className='btn-booknow' onClick={handleShow}>
                    Book Now
                  </button>
                ) : (
                  <LoginToBook />
                )}  
              {show && <BookNow handleClose={handleClose} handleClickClose={handleClickClose} />}
            </Col>
            <Owner />
        </Row>
     </Container>
     <Container className='mt-5 mb-5'>
        <Row>
            <Col sm="12" md="8" lg="8">
                <h3>Facilities</h3>
                <div className='d-flex mt-4'>
                    {facilities.map((facility, idx) => (
                        facility.value &&
                        <div key={idx}>
                            {facility.name === 'wifi' && (
                            <div className="square">
                                <AiOutlineWifi  className='icon-facility'/>
                                <div className="text">Wifi</div>
                            </div>
                            )}
                            {facility.name === 'parking' && (
                            <div className="square">
                                <AiFillCar className='icon-facility'/>
                                <div className="text">Parking</div>
                            </div>
                            )}
                            {facility.name === 'breakfast' && (
                            <div className="square">
                                <MdOutlineEmojiFoodBeverage  className='icon-facility'/>
                                <div className="text">Breakfast</div>
                            </div>
                            )}
                            {facility.name === 'pets' && (
                            <div className="square">
                                <MdPets  className='icon-facility'/>
                                <div className="text">Pets</div>
                            </div>
                            )}
                        </div>
                    ))}
                </div>
            </Col>
            <Col>
                <h3>Location</h3>
                 <p>{location?.address}</p>
                <p>{location?.city}, {location?.country}</p>
         
            </Col>
        </Row>
     </Container>
    </main>
    <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Book Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>hello yes booked</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    
    </>
  )
};

export default Venue;
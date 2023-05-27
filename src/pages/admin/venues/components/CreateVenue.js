import React, { useState } from 'react';
import '../../overview/admin.css';
import { Container, Row, Col } from 'react-bootstrap';
import './venues.css'
import { Button } from '../../../../components/styledComponents/mainStyles';
import { MdAdd, MdOutlineEmojiFoodBeverage, MdPets } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { createVenueSchema } from '../../../../utils/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiURL, holidazeVenues } from '../../../../utils/constants';
import Form from 'react-bootstrap/Form';
import useMethod from '../../../../hooks/useMethod';


const CreateVenue = () => {
  const [adminVisible] = useState(false);
  const [numMediaInputs, setNumMediaInputs] = useState(1);
  const [media, setMedia] = useState([]); // Add media state
  //const [selected, setSelected] = useState([]);

    // create states for each button and initialize them to false
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);

    const [location, setLocation] = useState({
        address: "",
        city: "",
        zip: "",
        country: "",
        lat: 0,
        lng: 0,
    });

    // toggle function for each button
    const toggleWifi = () => {
        setWifi(!wifi);
    };

    const toggleParking = () => {
        setParking(!parking);
    };

    const toggleBreakfast = () => {
        setBreakfast(!breakfast);
    };

    const togglePets = () => {
        setPets(!pets);
    };

  //Media inputs
  const addMediaInput = () => {
      setNumMediaInputs(numMediaInputs + 1);
    };

  const removeMediaInput = (index) => {
  setNumMediaInputs(numMediaInputs - 1);
  // remove media input with corresponding index from your data or state here
  };

  const handleMediaInputChange = (e, index) => {
    const { value } = e.target;
    const updatedMedia = [...media];
    updatedMedia[index] = value;
    setMedia(updatedMedia);
  };

  const { data, postInfo, isLoading, isError } = useMethod();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const profileName = JSON.parse(localStorage.getItem("name"));

      //Validate and handle form 
      const {
        register, 
        handleSubmit,
        formState: { errors }, 
        } = useForm({
            resolver: yupResolver(createVenueSchema),
        });
        
async function onFormSubmit(addVenue) {

  // Create media objects using the values from the media array
  const mediaObjects = media.map((mediaUrl) => ({ url: mediaUrl }));

  addVenue.meta.breakfast = breakfast;
  addVenue.meta.wifi = wifi;
  addVenue.meta.parking = parking;
  addVenue.meta.pets = pets;
  addVenue.media = media; // Assign the media array to the addVenue object

  // If the location inputs are not empty, update the location state
  if (
    addVenue.location.address ||
    addVenue.location.city ||
    addVenue.location.zip ||
    addVenue.location.country ||
    addVenue.location.lat ||
    addVenue.location.lng
  ) {
    setLocation(addVenue.location);
  }

  try {
    await postInfo(apiURL + holidazeVenues, addVenue);
    window.location.href = `/admin/venues/${profileName}`;
  } catch (error) {
    console.error("Create venue failed: ", error);
  }
}


  return (
    <>
    <div className='adminPage'>

        <div className={!adminVisible ? 'page mt-5' : 'page page-with-navbar mt-5'}>
        <Container className='p-5'>
        <div className='adminHeader'>
                    <h1 className='adminHeadOne primaryHeader'>Manage</h1>
                    <h1 className='adminHeadTwo mt-5'>Holidaze</h1>
        </div> 
        <h1>Create new venue</h1>
        <Form onSubmit={handleSubmit(onFormSubmit)} errors={errors} className='mb-5'>

        <div className='p-3'>
            <Row className='mt-3'>
                <Col sm="12" md="6" className='mb-4'>
                    <h5>TITLE</h5>
                    <Form.Control type="text" name="name" {...register('name')}/>
                    <span>{errors.name?.message}</span>
                </Col>
                <Col sm="12" md="6">
                    <h5>UPLOAD IMAGES</h5>
                    {[...Array(numMediaInputs)].map((_, extrainput) => (
                    <div className="d-flex align-items-center mb-2" key={`media-input-${extrainput}`}>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        name={`media[${extrainput}]`}
                        value={media[extrainput] || ""}
                        onChange={(e) => handleMediaInputChange(e, extrainput)}
                    />
                    {extrainput === 0 ? (
                        <button className="addmedia-btn" onClick={addMediaInput}>
                        <MdAdd className="addmedia-icon" />
                        </button>
                    ) : (
                        <button className="addmedia-btn" onClick={() => removeMediaInput(extrainput)}>
                        <RiDeleteBinLine className="addmedia-icon" />
                        </button>
                    )}
                    </div>
                ))}
                    {errors.media && <span>{errors.media.message}</span>}
            </Col>
            </Row>

            <Row className='mt-5'>
                <Col sm="12" md="6" className='mb-4'>
                    <h5 className=''>PRICE RANGE</h5>
                    <div className='lg:w-50'>
                        <Form.Group controlId="numberInput">
                            <Form.Control name="price" type="number" placeholder="100" step="1"{...register('price')} />
                            <span>{errors.price?.message}</span>
                        </Form.Group>
                    </div>            
                </Col>
                <Col sm="12" md="6" className='sm:mt-4'>
                    <h5>MAX GUESTS</h5>
                    <div className='lg:w-50'>
                        <Form.Group controlId="numberInput">
                            <Form.Control name="maxGuests" type="number" placeholder="1" step="1" {...register('maxGuests')}/>
                            <span>{errors.guests?.message}</span>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <h5 className='mt-5'>DESCRIPTION</h5>
            <Form.Control as="textarea" rows={2} name="description" {...register('description')}/>
            <span>{errors.description?.message}</span>


            <h5 className='mt-5'>FACILITIES</h5>
            <div className='d-flex mt-3'>
            <button
                className={wifi ? "meta-true" : "meta-false"}
                onClick={toggleWifi}
                type='button'
            >
                <AiOutlineWifi  className='icon-venue'/>
                <div className='text-venue'>Wifi</div>
            </button>
            <button
                className={parking ? "meta-true" : "meta-false"}
                onClick={toggleParking}
                type='button'
            >
                <AiFillCar className='icon-venue'/>
                <div className='text-venue'>Parking</div>
            </button>
            <button
                className={breakfast ? "meta-true" : "meta-false"}
                onClick={toggleBreakfast}
                type='button'
            >
                <MdOutlineEmojiFoodBeverage className='icon-venue'/>
                <div className='text-venue'>Breakfast</div>
            </button>
            <button
                    className={pets ? "meta-true" : "meta-false"}
                    onClick={togglePets}
                    type='button'
            >
                <MdPets  className='icon-venue'/>
                <div className='text-venue'>Pets</div>
            </button>
            </div>
        
            <Row className='mt-5'>
                    <Col sm="12" md="6" className='mb-4'>
                        <h5>ADDRESS</h5>
                        <Form.Control type="text" name="location.address" {...register('location.address')}/>
                        <span>{errors.location?.address?.message}</span>
                    </Col>
                    <Col sm="12" md="6">
                        <h5>CITY</h5>
                        <Form.Control type="text" name="location.city" {...register('location.city')}/>
                        <span>{errors.location?.city?.message}</span>
                    </Col>
                    </Row>
                    <Row className='mt-4'>
                    <Col sm="12" md="6" className='mb-4'>
                        <h5>ZIP</h5>
                        <Form.Control type="number" name="location.zip" {...register('location.zip')}/>
                        <span>{errors.location?.zip?.message}</span>
                    </Col>
                    <Col sm="12" md="6" className='mb-4'>
                        <h5>COUNTRY</h5>
                        <Form.Control type="text" name="location.country" {...register('location.country')}/>
                        <span>{errors.location?.country?.message}</span>
                    </Col>
                    </Row>
                    <Row className='mt-4'>
                    <Col sm="12" md="6" className='mb-4'>
                        <h5>LAT</h5>
                        <Form.Control type="number" step="0.000001" name="location.lat" {...register('location.lat')}/>
                        <span>{errors.location?.lat?.message}</span>
                    </Col>
                    <Col sm="12" md="6" className='mb-4'>
                        <h5>LNG</h5>
                        <Form.Control type="number" step="0.000001" name="location.lng" {...register('location.lng')}/>
                        <span>{errors.location?.lng?.message}</span>
                    </Col>
            </Row>

            <Button type="submit">
                CREATE VENUE
            </Button>
        </div>
        </Form>
        </Container>
        </div>
    
    </div>
    </>
  );
};

export default CreateVenue;



 
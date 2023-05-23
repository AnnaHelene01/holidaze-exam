import React, { useEffect, useState } from 'react';
import '../../overview/admin.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../components/venues.css'
import { Button } from '../../../../components/styledComponents/mainStyles';
import { MdOutlineEmojiFoodBeverage, MdPanoramaWideAngle, MdPets } from 'react-icons/md';
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { editSchema } from '../../../../utils/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiURL, holidazeVenues } from '../../../../utils/constants';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import useApi from '../../../../hooks/useApi';
import PreviewVenue from './components/PreviewVenue';
import useApiPut from '../../../../hooks/useApiPut';
import EditMedia from './components/EditMedia';


const EditVenue = () => {
  const [adminVisible] = useState(false);
  const { id } = useParams();
  //console.log("ID:", id);

  const { dataValues } = useApi(`${apiURL}${holidazeVenues}/${id}`);
  //console.log("DataValues: ", dataValues);

  const [wifi, setWifi] = useState(dataValues?.meta?.wifi || false);
  const [parking, setParking] = useState(dataValues?.meta?.parking || false);
  const [breakfast, setBreakfast] = useState(dataValues?.meta?.breakfast || false);
  const [pets, setPets] = useState(dataValues?.meta?.pets || false);
  

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


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Add watch function
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const watchedValues = watch(); // Get the current watched values


  const { data, putData, isLoading, isError } = useApiPut();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (data) {
      console.log("Data: ", data);
    }
  }, [data]);

  async function onFormSubmit(editVenue) {
    console.log(dataValues)

if (!editVenue.name) {
    editVenue.name = dataValues.name
}
if (!editVenue.price) {
    editVenue.price = dataValues.price
}

    const metaValues = {
      breakfast: breakfast,
      wifi: wifi,
      parking: parking,
      pets: pets
    };
    editVenue = { ...editVenue, meta: metaValues };

    try {
        console.log(editVenue)
     // await putData(`${apiURL}${holidazeVenues}/${id}`, editVenue);
    } catch (error) {
      console.error("Edit venue failed: ", error);
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
        <Row>
            <Col sm="12" md="6">
                <h1>Edit your venue</h1>
                <Form onSubmit={handleSubmit(onFormSubmit)} errors={errors} className='mb-5'>

                <div className='p-3'>
                    <Row className='mt-3'>
                        <Col sm="12" className='mb-4'>
                            <h5>TITLE</h5>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                {...register('name')}
                                defaultValue={dataValues?.name}
                                />
                            <span>{errors.name?.message}</span>
                        </Col>
                        <Col sm="12">
                        <h5>UPLOAD IMAGES</h5>
                        <EditMedia register={register} errors={errors}/>
                    </Col>
                    </Row>
                    <Row className='mt-5'>

                        <Col sm="12" md="6" className='mb-4'>
                            <h5 className=''>PRICE RANGE</h5>
                            <div className='lg:w-50'>
                                    <Form.Control 
                                        name="price" 
                                        type="number" 
                                        placeholder="100" 
                                        step="1"
                                        {...register('price')} 
                                        defaultValue={dataValues?.price}
                                        />
                                    <span>{errors.price?.message}</span>
                                
                                
                            </div>            
                        </Col>
                        <Col sm="12" md="6">
                            <h5>MAX GUESTS</h5>
                            <div className='lg:w-50'>
                                    <Form.Control 
                                        name="maxGuests" 
                                        type="number" 
                                        placeholder="1" 
                                        step="1" 
                                        {...register('maxGuests')}
                                        defaultValue={dataValues?.maxGuests}
                                        />
                                    <span>{errors.maxGuests?.message}</span>
                            </div>
                        </Col>

                    </Row>
                    <h5 className='mt-5'>DESCRIPTION</h5>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="description" 
                        {...register('description')}
                        defaultValue={dataValues?.description}
                        />
                    <span>{errors.description?.message}</span>


                    <h5 className='mt-5'>FACILITIES</h5>
         
                    <div className='d-flex mt-3'>
                    <button
                        className={wifi ? "meta-true" : "meta-false"}
                        onClick={toggleWifi}
                        type='button'
                    >
                         <AiOutlineWifi className='icon-venue' />
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
                            <Form.Control 
                                type="text" 
                                name="address"
                                {...register('address')}
                                defaultValue={dataValues?.location?.address}
                                />
                        </Col>
                        <Col sm="12" md="6">
                            <h5>CITY</h5>
                            <Form.Control 
                                type="text" 
                                name="city"
                                {...register('city')}
                                defaultValue={dataValues?.location?.city}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col sm="12" md="6" className='mb-4'>
                            <h5>ZIP</h5>
                            <Form.Control 
                                type="number" 
                                name="zip"
                                {...register('zip')}
                                defaultValue={dataValues?.location?.zip}
                            />
                        </Col>
                        <Col sm="12" md="6">
                            <h5>COUNTRY</h5>
                            <Form.Control 
                                type="text"    
                                name="country"
                                {...register('country')}
                                defaultValue={dataValues?.location?.country}
                            />
                        </Col>
                    </Row>
                    <Button type="submit" className='mt-4'>
                        EDIT VENUE
                    </Button>
                </div>
                </Form>
            </Col>
            
            <Col sm="12" md="6">
                <h1 className='text-center'>Preview Venue</h1>
                <PreviewVenue
                    name={watchedValues?.name || dataValues?.name} 
                    media={watchedValues?.media?.[0] || dataValues?.media?.[0]} 
                    description={watchedValues?.description || dataValues?.description} 
                    price={watchedValues?.price || dataValues?.price} 
                    maxGuests={watchedValues?.maxGuests || dataValues?.maxGuests} 
                    address={watchedValues?.address || dataValues?.location?.address}
                    />       
            </Col>
        </Row>
        </Container>
        </div>
    </div>
    </>
  );
};

export default EditVenue;

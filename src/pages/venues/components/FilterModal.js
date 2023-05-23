import React from 'react';
import './filtermodal.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {  MdOutlineEmojiFoodBeverage, MdPets } from 'react-icons/md';
import { Form } from 'react-bootstrap';
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';


const FilterModal = ({
  show,
  handleClose,
  setWifi,
  setParking,
  setBreakfast,
  setPets,
  setMinPrice,
  setMaxPrice,
  setGuests,
  wifi,
  parking,
  breakfast,
  pets,
  minPrice,
  maxPrice,
  guests
}) => {
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

      const handlePriceChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'minPrice') {
          setMinPrice(value);
        } else if (name === 'maxPrice') {
          setMaxPrice(value);
        }
      };

      const handleGuestsChange = (event) => {
        const { value } = event.target;
        setGuests(value);
      };
      
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Venues</Modal.Title>
      </Modal.Header>
      <div className='p-3'>
        <h5>FACILITIES</h5>

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

            <h5 className='mt-5'>PRICE RANGE</h5>
          <div className='mt-3'>
            Selected Price Range: {minPrice} - {maxPrice}
          </div>
          <div className='d-flex'>
              <Form.Control
                type='number'
                placeholder='Min Price'
                min='0'
                max='100'
                step='1'
                name='minPrice'
                value={minPrice}
                onChange={handlePriceChange}
              />
              <span className="price-range-divider">-</span>
              <Form.Control
                type='number'
                placeholder='Max Price'
                min='0'
                max='100'
                step='1'
                name='maxPrice'
                value={maxPrice}
                onChange={handlePriceChange}
              />
          </div>

          <h5 className='mt-5'>GUESTS</h5>
          <Form className='w-25'>
              <Form.Group controlId='numberInput'>
                <Form.Control
                    type='number'
                    name="guests"
                    placeholder='1'
                    min='0'
                    max='100'
                    step='1'
                    value={guests}
                    onChange={handleGuestsChange}
                />
              </Form.Group>
          </Form>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;

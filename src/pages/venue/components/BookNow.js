import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, Form, Row } from 'react-bootstrap';
import { apiURL, holidazeBookings, holidazeVenues } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { startOfToday } from 'date-fns';

const BookNow = ({ handleClose, handleClickClose }) => {
  const { venueId } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [allbookings, setAllBookings] = useState([]);
  const [maxGuestError, setMaxGuestError] = useState('');
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // const [showConfirmation, setShowConfirmation] = useState(false);

  const [allDisabled, setAllDisabled] = useState([])
  //Get bookings for Venue
  const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '/' + venueId + "?_bookings=true");

  const { bookings } = dataValues;

  //Watch for changes in the variable to update calender accordingly 
  useEffect(() => {
    if (bookings) {
        const bookingsWithDates = bookings?.map((booking) => ({
            dateFrom: new Date(booking.dateFrom),
            dateTo: new Date(booking.dateTo),
          }));
          
          
      setAllBookings(bookingsWithDates);
      disabledDates()
    }
  }, [bookings]);
  
  const isDateBooked = (end) => {

    let test1 = Math.floor(new Date(startDate).getTime())/1000
    let test2 = Math.floor(new Date(end).getTime())/1000
    for(let disabledDate of allDisabled){

        let dis = Math.floor(new Date(disabledDate).getTime())/1000
        if(dis >= test1  && dis <= test2 ){
            setEndDate(null)
            break
        } else {
        }
    }
  };
  
  const disabledDates = () => {
    const disabled = [];
    for(let b of allbookings){
        let currentDate = new Date(b.dateFrom);
        while(currentDate <= b.dateTo){
            disabled.push(currentDate);
            currentDate = new Date(currentDate.getTime() +24 *60 * 60 *1000)
            if(currentDate > new Date(b.dateTo))break
        }
    }
    setAllDisabled(disabled)
  };
  
  const handleBookNow = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          

        },
        body: JSON.stringify({
          dateFrom: startDate,
          dateTo: endDate,
          guests,
          venueId,
        }),
        
      };

          // Get the maximum number of guests allowed for the venue
    const maxGuests = dataValues?.maxGuests;

    // Check if the number of guests entered is greater than the maximum number of guests allowed
    if (guests > maxGuests) {
      setMaxGuestError(`The maximum number of guests allowed for this venue is ${maxGuests}. Please enter a lower number of guests.`);
      return;
    }

      const response = await fetch(`${apiURL}${holidazeBookings}`, options);
      const data = await response.json();
      handleClose();
      // handleShowConfirmation();
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col sm="6">
                <Form.Group controlId="checkin" className="text-left">
                <Form.Label>Check In</Form.Label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    excludeDates={allDisabled}
                    className="form-control"
                    placeholderText="Check In"
                    minDate={startOfToday()} // Add this line to disable all dates before today
                />
                </Form.Group>
            </Col>
            <Col sm="6">
                <Form.Group controlId="checkout" className="text-left">
                <Form.Label>Check Out</Form.Label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {setEndDate(date); isDateBooked(date)}}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    excludeDates={allDisabled}
                    className="form-control"
                    placeholderText="Check Out"
                    minDate={startDate ? startDate : startOfToday()} // Add this line to disable all dates before today or the selected startDate
                />
                </Form.Group>
            </Col>
        </Row>


          <Form.Group controlId="numberInput" className="mt-4 w-50">
            <Form.Label>Guests (max: {dataValues.maxGuests})</Form.Label>
            <Form.Control
                name="maxGuests"
                type="number"
                placeholder="1"
                value={guests}
                min="1"
                step="1"
                onChange={(e) => setGuests(parseInt(e.target.value))}
            />
            <p className='mt-4'>{maxGuestError}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className='booknow-btn' onClick={handleBookNow} disabled={!startDate || !endDate}>
            Book Now
          </button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
};

export default BookNow;
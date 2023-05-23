import React, { useEffect, useState } from 'react'
import '../profile.css'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { apiURL, holidazeBookings, holidazeProfiles } from '../../../../utils/constants';
import { BsTrash } from 'react-icons/bs';

const UpcomingBookings = () => {
    const { name } = useParams();
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const profileName = JSON.parse(localStorage.getItem("username"));
    const [bookings, setBookings] = useState({});
  
      async function getUserBookings() {
          try {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify()
            };
            const response = await fetch(
              `${apiURL}${holidazeProfiles}/${profileName}?_bookings=true`,
              options
            );
            console.log(response);
            const data = await response.json(); // Extract JSON data
            setBookings(data);
            console.log(bookings)
            
            console.log("Data: ", data); // Log the extracted data
          } catch (error) {
            console.error(error);
          }
        }
        
        useEffect (() => {
          getUserBookings();
        }, [name]);

        async function deleteBooking(bookingId) {
            const url = `${apiURL}${holidazeBookings}/${bookingId}`;
            console.log(url);
            try {
              const options = {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              };
              const response = await fetch(url, options);
              if (response.status === 204) {
                window.location = `/admin/profile/${profileName}`;
              }
            } catch (error) {
              console.warn(error);
            }
          }
          

        return (
            <>
              <Row className='bg-white p-2 p-md-4 p-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-2'>
                {bookings.bookings?.map((booking) => (
                  <Col key={booking.id} className='mb-4'>
                    <div className="venue-box">
                      <button
                        className="trash-btn"
                        onClick={() => deleteBooking(booking.id)}
                      >
                        <BsTrash />
                      </button>
                      <img src={booking.venue.media[0]} alt="image-description" />
                      <div className="venue-box-overlay">
                        <h5>{booking.venue.name}</h5>
                        <p>{new Date(booking.dateFrom).toLocaleDateString("en-GB")}</p>
                        <p>-</p>
                        <p>{new Date(booking.dateTo).toLocaleDateString("en-GB")}</p>
                      </div>
                    </div>
                  </Col>
                ))}
                 </Row>
               </>
          );
          
    }

        
export default UpcomingBookings;

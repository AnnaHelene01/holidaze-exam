import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import admin from '../../../assets/admin.png';
import { BookingsContext } from '../../../context/BookingContext';
import { VenuesContext } from '../../../context/VenueContext';
import { apiURL, holidazeProfiles } from '../../../utils/constants';
import TodoList from './components/ToDo-List/TodoList';
import { Link } from 'react-router-dom';

const Admin = () => {
  useEffect(() => {
    document.title = 'Holidaze/Admin';
  }, []);
  const [adminVisible] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const profileName = JSON.parse(localStorage.getItem("username"));
  const { setVenues, venues } = useContext(VenuesContext);
  const { setBookings, bookings } = useContext(BookingsContext);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    async function getLengthVenues() {
        try {   
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await fetch(
            `${apiURL}${holidazeProfiles}/${profileName}/venues?_bookings=true`,
            options
          );
          const data = await response.json(); // Extract JSON data
          setVenues(data);
          let total = 0;
          data.forEach((venue) => {
            total += venue.bookings.length;
          });

          setTotalBookings(total);

        } catch (error) {
          console.error(error);
        }
      }

      getLengthVenues();
    }, []);
  
  return (
    <>
    <div className='adminPage'>

        <div className={!adminVisible ? 'page mt-5' : 'page page-with-navbar mt-5'}>
        <Container className='p-5'>
        <div className='adminHeader'>
                    <h1 className='adminHeadOne primaryHeader'>Manage</h1>
                    <h1 className='adminHeadTwo mt-5'>Holidaze</h1>
        </div> 
        <h1>Overview</h1>
        <div className="content-wrapper">
            <Row>
                <Col className='mt-2'>
                <Link to='/admin/bookings' className='text-decoration-none text-black'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total bookings</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>{totalBookings}</h2>
                                <img src={admin} alt="diagram" className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>   
                </Link>             
                </Col>
                <Col className='mt-2'>
                <Link to={`/admin/venues/${profileName}`} className='text-decoration-none text-black'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Venues available</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>{venues?.length}</h2>
                                <img src={admin} alt="diagram" className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>   
                </Link>              
                </Col>
                <Col className='mt-2'>
                <Card>
                        <Card.Body>
                            <Card.Title>Expired venues</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>4,366</h2>
                                <img src={admin} alt="diagram" className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>                 
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Lorem ipsum</Card.Title>
                        </Card.Body>
                    </Card>                 
                </Col>     
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Get stuff done!</Card.Title>
                            <TodoList />
                        </Card.Body>
                    </Card>
                </Col>           
            </Row>
            </div>
        </Container>
        </div>
    
    </div>
    </>
  );
};

export default Admin;

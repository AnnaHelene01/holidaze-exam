import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import admin from '../../../assets/admin.png';
import { BookingsContext } from '../../../context/BookingContext';
import { VenuesContext } from '../../../context/VenueContext';
import { apiURL, holidazeProfiles } from '../../../utils/constants';
import TodoList from './components/ToDo-List/TodoList';

const Admin = () => {
  const [adminVisible] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const profileName = JSON.parse(localStorage.getItem("username"));
  const { setVenues, venues } = useContext(VenuesContext);
  const { setBookings, bookings } = useContext(BookingsContext);

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
            `${apiURL}${holidazeProfiles}/${profileName}/venues`,
            options
          );
          const data = await response.json(); // Extract JSON data
          setVenues(data);
          console.log("Data: ", data); // Log the extracted data
        } catch (error) {
          console.error(error);
        }
      }

      getLengthVenues();
    }, []);
  
    useEffect(() => {
        async function getLengthBookings() {
            try {   
              const options = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              };
              const response = await fetch(
                `${apiURL}${holidazeProfiles}/${profileName}/bookings`,
                options
              );
              const data = await response.json(); // Extract JSON data
              setBookings(data);
              console.log("Data: ", data); // Log the extracted data
            } catch (error) {
              console.error(error);
            }
          }
    
          getLengthBookings();
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
                    <Card>
                        <Card.Body>
                            <Card.Title>Total bookings</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>{bookings.length}</h2>
                                <img src={admin} className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>                
                </Col>
                <Col className='mt-2'>
                <Card>
                        <Card.Body>
                            <Card.Title>Venues available</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>{venues?.length}</h2>
                                <img src={admin} className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>                 
                </Col>
                <Col className='mt-2'>
                <Card>
                        <Card.Body>
                            <Card.Title>Expired venues</Card.Title>
                            <div className='d-flex'>
                                <h2 className='admin-card'>4,366</h2>
                                <img src={admin} className='bookings-img'></img>    
                            </div>
                        </Card.Body>
                    </Card>                 
                </Col>
            </Row>
            <Row>
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Something cool here</Card.Title>
                        </Card.Body>
                    </Card>                 
                </Col>     
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Get shit done!</Card.Title>
                            <TodoList />
                        </Card.Body>
                    </Card>
                </Col>           
            </Row>
            </div>
            <h2 className='mt-5'>Upcoming bookings</h2>
            <Row>
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Something cool here</Card.Title>
                        </Card.Body>
                    </Card> 
                </Col>
                <Col className='mt-4'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Something cool here</Card.Title>
                        </Card.Body>
                    </Card> 
                </Col>
            </Row>
        </Container>
        </div>
    
    </div>
    </>
  );
};

export default Admin;

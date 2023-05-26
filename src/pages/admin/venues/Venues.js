import React, { useContext, useEffect, useState } from 'react';
import '../overview/admin.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { apiURL, holidazeProfiles } from '../../../utils/constants';
import VenueCard from './components/VenueCard';
import { VenuesContext } from '../../../context/VenueContext';
import Loader from '../../../components/Loader'


const Venues = () => {
  const [adminVisible] = useState(false);
  const { name } = useParams();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const profileName = JSON.parse(localStorage.getItem("username"));
  const [loading, setLoading] = useState(true); // Add loading state

  const { setVenues, venues } = useContext(VenuesContext);

  useEffect(() => {
    async function getUserVenues() {
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
          setLoading(false);
          console.log(venues);
        } catch (error) {
          console.error(error);
        }
      }

      getUserVenues();
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
                <h1>Venues</h1>
                <p>You have a total {venues.length} of venues!</p>
                <div className="content-wrapper">
                        <div className="d-flex justify-content-end">
                            <button className='createVenue-btn'>
                                <Link to='/admin/createvenue'>Create New</Link>
                            </button>
                        </div>
                <Row className='bg-white p-2 p-md-4 p-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3'>
                  {venues?.map((venue) => (
                      <Col key={venue.id} className='mb-4'>
                        <VenueCard venue={venue} />
                      </Col>
                  ))}
                </Row>
                </div>
            </Container>
        </div>
    </div>
    </>
  );
};

export default Venues;



 
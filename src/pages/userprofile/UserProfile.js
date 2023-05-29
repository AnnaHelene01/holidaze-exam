import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Avatar from '../admin/Profile/components/Avatar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpcomingBookings from '../admin/Profile/components/UpcomingBookings';
import PFavorites from '../admin/Profile/components/PFavorites';


const UserProfile = () => {
    useEffect(() => {
        document.title = 'Holidaze - Profile';
      }, []);
    
   //Get user from localStorage
   //Parse the since it is a string
   const userName = JSON.parse(localStorage.getItem('username'));

  return (
    <>
        <Container className='py-5'>
        <div className='adminHeader mt-5'>
                    <h1 className='adminHeadOne primaryHeader'>Holidaze</h1>
                    <h1 className='adminHeadTwo mt-5'>Profile</h1>
        </div> 
        <h2>Welcome @{userName}</h2>

        <Avatar />

        <div className="mt-5">
            <Tabs
                id="uncontrolled-tab-example"
                className="custom-tabs"
                >
                <Tab eventKey="upcoming-bookings" title="Upcoming Bookings" className='tab-link'>
                    <UpcomingBookings />
                </Tab>
                <Tab eventKey="favorites" title="Favorites" className='tab-link'>
                     <Row className='bg-white p-2 p-md-4 p-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3'>
                         <PFavorites />
                    </Row>
                </Tab>
            </Tabs>
        </div>
        </Container>    
    </>
  );
};

export default UserProfile;

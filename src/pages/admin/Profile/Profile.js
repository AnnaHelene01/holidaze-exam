import React, { useEffect, useState } from 'react';
import '../overview/admin.css';
import './profile.css'
import { Container, Row } from 'react-bootstrap';
import Avatar from './components/Avatar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpcomingBookings from './components/UpcomingBookings'
import PFavorites from '../Profile/components/PFavorites';
import { useParams } from 'react-router-dom';


const Profile = () => {
    useEffect(() => {
        document.title = 'Holidaze/Admin/Profile';
      }, []);
  const [adminVisible, showAdmin] = useState(false);
  const { name } = useParams();

   //Get user from localStorage
   //Parse the since it is a string
   const userName = JSON.parse(localStorage.getItem('username'));

  return (
    <>
    <div className='adminPage'>

        <div className={!adminVisible ? 'page mt-5' : 'page page-with-navbar mt-5'}>
        <Container className='p-5'>
        <div className='adminHeader'>
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
        </div>
    
    </div>
    </>
  );
};

export default Profile;



 
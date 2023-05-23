import { Route, Routes } from 'react-router-dom';
import React from 'react'
import './main.css'
import '../src/utils/themes.scss'
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Admin from './pages/admin/overview/Admin';
import Bookings from './pages/admin/bookings/Bookings';
import Profile from './pages/admin/Profile/Profile';
import Venues from './pages/admin/venues/Venues';
import AllVenues from './pages/venues/AllVenues';
import Venue from './pages/venue/Venue';
import CreateVenue from './pages/admin/venues/components/CreateVenue';
import UserProfile from './pages/userprofile/UserProfile';
import EditVenue from './pages/admin/venues/editVenue/EditVenue';

const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/allvenues' element={<AllVenues />}/>
          <Route path='/venue/:venueId' element={<Venue />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/profile:name' element={<UserProfile />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/admin/bookings' element={<Bookings />}/>
          <Route path='/admin/venues/:name' element={<Venues />} />  
          <Route path='/admin/createvenue' element={<CreateVenue />}/>
          <Route path='/admin/editvenue/:id' element={<EditVenue />}/>
          <Route path='/admin/profile/:name' element={<Profile />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Layout>
    </>
  )
};

export default App;

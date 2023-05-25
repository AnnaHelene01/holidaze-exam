import React, { useState } from 'react'
import './home.css'
import CardSlider from './components/CardSlider/CardSlider'

import { Button, Container } from '../../components/styledComponents/mainStyles';
import { Link } from 'react-router-dom';
import DesignComp from './components/DesignComp';
import Featured from './components/featured/Featured';

const Home = () => {

    // Filter states
    const [location, setLocation] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
    // Function to handle the search button click
    const handleSearch = () => {
      const query = `?location=${location}&maxGuests=${maxGuests}&maxPrice=${maxPrice}`;
      window.location.href = `/allvenues${query}`;
    };
    

  return (
    <>
      <section className='home'>
      <Container className='secContainer'>
        <div className="homeText">
           <h1 data-aos="fade-up" data-aos-duration="2000" className="title">
            Plan your next trip with Holidaze
           </h1>
           <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
             Travel to your favourite destination!
           </p>
           <Link to="/allvenues" className='text-decoration-none'>
              <Button data-aos="fade-up" data-aos-duration="3000" className="btn text-white">
                Explore Now
              </Button>
            </Link>
        </div>

        <div className="homeCard grid">
            <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
                 <label htmlFor="location">Location</label>
                 <input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
                 <label htmlFor="distance">Guests</label>
                 <input type="text" placeholder='4' value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
            </div>
            <div data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
                 <label htmlFor="price">Max Price</label>
                 <input type="text" placeholder='$500' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <Button data-aos="fade-left" data-aos-duration="3500" className='btn' onClick={handleSearch}>Search</Button>
        </div>
      </Container>
    </section> 
    <CardSlider />
    <Featured />
    <DesignComp />
    </>
  )
};

export default Home;

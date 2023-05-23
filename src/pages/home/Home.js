import React from 'react'
import './home.css'
import CardSlider from './components/CardSlider/CardSlider'
import { apiURL } from '../../utils/constants';
import useApi from '../../hooks/useApi';
import { Button, Container } from '../../components/styledComponents/mainStyles';
import { Link } from 'react-router-dom';
import DesignComp from './components/DesignComp';
import Featured from './components/featured/Featured';

const Home = () => {

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
           <Button data-aos="fade-up" data-aos-duration="3000" className="btn">
                <Link to="/allvenues">Explore Now</Link>
              </Button>
        </div>

        <div className="homeCard grid">
           <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
              <label htmlFor="location">Location</label>
              <input type="text" placeholder='Location'/>
           </div>
           <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
              <label htmlFor="distance">Guests</label>
              <input type="text" placeholder='4'/>
           </div>
           <div data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
              <label htmlFor="price">Max Price</label>
              <input type="text" placeholder='$500'/>
           </div>
           <Button data-aos="fade-left" data-aos-duration="3500" className='btn'>Search</Button>
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

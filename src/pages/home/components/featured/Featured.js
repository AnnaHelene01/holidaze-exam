import React from 'react'
import './featured.css'
import FeaturedVenue from './FeaturedVenue';

const Featured = () => {
    //ID for the featured venues
    const venueIds = [
        'ae3acdd3-36d6-4cfa-a874-ac83fd2ed6a5',
        'c0a78a0a-3a1b-459c-928a-5f33ad475dec',
        '4b2ec2ce-5e45-448f-bf37-57386c23964f',
      ];

  return (
    <>
    <section className='featured section container'>
        <div className="secContainter">
            <div data-aos="fade-up" data-aos-duration="2000"  className="secIntro">
                  <h2 className='secTitle'> Featured Venues </h2>
                  <p>From historical cities to natural specteculars, come see the best of the world!</p>
            </div>

            <div className="mainContent grid">
                {venueIds.map((venueId) => (
                    <FeaturedVenue key={venueId} venueId={venueId} />
                    ))}        
            </div>
      </div>
    </section> 
    </>
  )
};

export default Featured;

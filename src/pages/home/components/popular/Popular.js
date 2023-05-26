import React from 'react'
import PopularVenue from './PopularVenue';

const Popular = () => {
    //ID for the featured venues
    const venueIds = [
        'bde96f0d-3960-4d1f-a2fe-27ada649284d',
        'd8f945a6-4ff7-4d97-b0a4-13be0b137c72',
        'e592f09f-bdab-4ac4-8aba-f69b668d3c74',
        'e2a591ef-98d9-4c57-a006-a58698d0fb29',
      ];    

  return (
    <>
      <section className='destination section container'>
         <div className="secContainter">
            <div className="secHeader flex">
                <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
                     <h2 className='secTitle'> Popular Destinations </h2>
                     <p> From the big cities, to extraordinary nature destinations. Check it out! </p>
                </div>
            </div>
            <div className="mainContent grid">
                {venueIds.map((venueId, index) => (
                    <PopularVenue key={venueId} venueId={venueId} index={index} />
                    ))}        
            </div>
        </div>
     </section>
    </>
  )
};

export default Popular;

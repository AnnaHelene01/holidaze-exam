import React from 'react'
import './cartSlider.css'
import "react-multi-carousel/lib/styles.css";
import example2 from './example2.avif'
import { BsArrowRightShort } from 'react-icons/bs'
  
  const Data = [
   
      {
      id:1,
      imgSrc: example2,
      destTitle: 'Hotelroom',
      location: 'Norway',
      grade: '5',
      },
    
      {
      id:2,
      imgSrc: example2,
      destTitle: 'Cabin',
      location: 'Norway',
      grade: '5',
      },
    
      {
      id:3,
      imgSrc: example2,
      destTitle: 'Apartment',
      location: 'Norway',
      grade: '5 ',  
      },
    
    
      {
      id:4,
      imgSrc: example2,
      destTitle: 'Camping',
      location: 'Norway',
      grade: '5 ',
      }
    
    ]
  
  const CartSlider = () => {
    return (
      <section className='destination section container'>
      <div className="secContainter">
  
        <div className="secHeader flex">
  
          <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
          <h2 className='secTitle'>
          Destinations
          </h2>
          <p>
          From the big cities, to extraordinary nature destinations. Check it out!
          </p>
          </div>
        </div>
  
        <div className="mainContent grid">
          {/* Single Destination from the map Array */}
  
          {
            Data.map(({id, imgSrc, destTitle, location, grade })=>{
              return (
                <div key={id} data-aos="fade-up" className="singleDestination">
            <div className="destImage">
  
            <img src={imgSrc} alt="" />
  
            <div className="overlayInfo">
                <h3>
                  {destTitle}
                </h3>
                <p>
                  {location}
                </p>
  
                <BsArrowRightShort className='overlay-icon'/>
               
            </div>
            </div>
  
            <div className="destFooter">
            <div className="number">
                0{id}
             </div>
  
             <div className="destText flex">
               <h6>
                {location} 
               </h6>
             </div>
            </div>      
           </div>
              )
            })
          }
        </div>
      </div>
     </section>
    )
  };
  
  export default CartSlider;
  
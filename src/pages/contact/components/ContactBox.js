import React from 'react'
import { Button, Container } from '../../../components/styledComponents/mainStyles';

const ContactBox = () => {
  return (
    <>
     <section className='contact'>
      <Container>  
      <div className="secContainer">
        <div className="homeText">
           <h1 data-aos="fade-up" data-aos-duration="2000" className="title">
           We´re here for you           
           </h1>
           <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
           We are professionals which means we have the knowledge you´re looking for </p>
           <div className='contactOpening'>
            <p data-aos="fade-up" data-aos-duration="2500" className="openTitle"><strong>Monday-Friday:</strong>7 am - 9 pm</p>
            <p data-aos="fade-up" data-aos-duration="2500" className="openTitle"><strong>Saturday:</strong>9 am - 3 pm</p>
            <p data-aos="fade-up" data-aos-duration="2500" className="openTitle"><strong>Sunday:</strong>CLOSED</p>
           </div>
        </div>

        <div className='secoContainer'>
            <div data-aos="fade-up" data-aos-duration="3000" className="contactCard">
                    <div className="contactBody">
                        <div className="">
                        <h4>
                        Credit card support
                        </h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis.</p>
                        </div>

                        <Button className='btn'>CALL US </Button>

                    </div>
                </div>
                
                <div data-aos="fade-up" data-aos-duration="3000" className="contactCard">
                    <div className="contactBody">
                        <div className="">
                        <h4>
                        Booking support
                        </h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis.</p>
                        </div>

                        <Button className='btn'>CALL US </Button>

                    </div>
                </div>

                <div data-aos="fade-up" data-aos-duration="3000" className="contactCard">
                    <div className="contactBody">
                        <div className="">
                        <h4>
                        General support
                        </h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis.</p>
                        </div>

                        <Button className='btn'>CALL US </Button>

                    </div>
                </div>
      </div>

      </div>
      </Container>
    </section>
    </>
  )
};

export default ContactBox;

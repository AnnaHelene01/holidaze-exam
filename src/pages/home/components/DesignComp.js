import React from 'react'
import './components.css'
import { Col, Row } from 'react-bootstrap';
import { FaSearchLocation, FaUserAlt } from 'react-icons/fa';
import { BsFillHouseDoorFill } from 'react-icons/bs';

const DesignComp = () => {
  return (
    <>
      <div className='design-component mt-5'>
        <Row className='text-center'>
          <Col sm="12" md="4">
              <div>
                  <span className='rounded-circle'>
                    <FaUserAlt />
                  </span>
                  <h3 className='secTitle'>2000+ Customers</h3>
              </div>
          </Col>
          <Col sm="12" md="4">
              <div>
                  <span className='rounded-circle'>
                    <FaSearchLocation />
                  </span>
                  <h3 className='secTitle'>100+ Locations</h3>
              </div>
          </Col>
          <Col sm="12" md="4">
              <div>
                  <span className='rounded-circle'>
                    <BsFillHouseDoorFill />
                  </span>
                  <h3 className='secTitle'>1000+ Venues</h3>
              </div>
          </Col>
        </Row>
      </div>
    </>
  )
};

export default DesignComp;

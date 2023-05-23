import React from 'react'
import { Col, Row } from 'react-bootstrap';
import example from '../../../assets/example.avif'

const UserBookings = () => {
  return (
    <>
    <Row className='bg-white p-2 p-md-4 p-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3'>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
                <Col className='mb-4'>
                    <div className="venue-box">
                        <img src={example} alt="image-description" />
                        <div className="venue-box-overlay d-flex">
                            <h2>Title</h2>
                            <button>Edit</button>
                        </div>
                    </div>
                </Col>
        </Row>
    </>
  )
};

export default UserBookings;

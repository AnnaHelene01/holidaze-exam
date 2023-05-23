import React from 'react';
import './register.css'
import { Container, Section } from '../../components/styledComponents/mainStyles';
import { Col, Row } from 'react-bootstrap';
import collection from '../../assets/collection.png'

import RegisterForm from './components/RegisterForm';


const Register = () => {


  return (
    <>
    <Container className='py-5 primaryBg'>
        <Section>
        <Row>
            <Col sm="12" md="6" className='order-2 order-md-1'>
               <img src={collection} alt="Collection of travel images"  style={{ height: "620px", objectFit: "cover" }}></img>
            </Col>
            <Col sm="12" md="6" className='order-1 order-md-2' style={{ paddingRight: "2rem", paddingLeft: "2rem" }}>
                <div className='headerBox'>
                    <h1 className='mainHeadOne primaryHeader'>Holidaze</h1>
                    <h1 className='mainHeadTwo mt-5'>Register</h1>
                </div>  
               <RegisterForm />
            </Col>
        </Row>
        </Section>
    </Container>
     
    </>
  )
};

export default Register;

import React from 'react';
import { Container, Section } from '../../components/styledComponents/mainStyles';
import LoginForm from './components/LoginForm';
import { Col } from 'react-bootstrap';

const Login = () => {


  return (
    <>
      <Container className="py-5 primaryBg">
        <Col className='w-50 m-auto mt-5'>
          <Section>
            <div className="headerBox">
              <h1 className="mainHeadOne primaryHeader">Holidaze</h1>
              <h1 className="mainHeadTwo mt-5">Login</h1>
            </div>
            <LoginForm />
          </Section>
        </Col>
      </Container>
    </>
  );
};

export default Login;
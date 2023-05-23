import React from 'react'
import '../contact.css'
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { Container, ContactFormSection, Button } from '../../../components/styledComponents/mainStyles';

const ContactForm = () => {
  return (
    <>
      <ContactFormSection>
        <Container>
       <form id='form' style={{ width: '100%', maxWidth: '300px' }}>
      <h2>SEND US A MESSAGE</h2>

      <MDBInput label='Name' v-model='name' wrapperClass='mb-4' />

      <MDBInput type='email' label='Email address' v-model='email' wrapperClass='mb-4' />

      <MDBInput label='Subject' v-model='subject' wrapperClass='mb-4' />

      <MDBTextArea wrapperClass='mb-4' label='Message' />

      <Button className='text-white'>
        Send
      </Button>
    </form>
    </Container>
    </ContactFormSection> 
    </>
  )
};

export default ContactForm;

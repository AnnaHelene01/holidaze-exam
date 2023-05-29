import React, { useEffect } from 'react'
import './contact.css'
import ContactBox from './components/ContactBox';
import ContactForm from './components/ContactForm';

const Contact = () => {
  useEffect(() => {
    document.title = 'Holidaze - Contact';
  }, []);

  return (
    <>
     <ContactBox /> 
     <ContactForm />
    </>
  )
};

export default Contact;

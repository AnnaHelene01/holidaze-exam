import React, { useState } from 'react';
import '../register.css'
import { apiURL, authRegister } from '../../../utils/constants';
import { Button } from '../../../components/styledComponents/mainStyles';
import Form from 'react-bootstrap/Form';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useApiPost from '../../../hooks/useApiPost';
import { registerSchema } from '../../../utils/schema';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
    const { data, isLoading, isError, postData } = useApiPost(apiURL + authRegister);
    const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  
    //Validate form
    const {
      register, 
      handleSubmit,
      formState: { errors, isValid }, 
      
  } = useForm({
      resolver: yupResolver(registerSchema),
  });
  
  
  
async function onFormSubmit(event) {
  
      if (!isValid) { // <-- use isValid from formState
        return; // Do not submit the form if it's not valid
      }
  
      event.venueManager = selectedCheckbox
      try {
        await postData(apiURL + authRegister, event );
          window.location.href = '/login';
        } catch (error) {
          console.error("Registration failed: ", error);
        }
    }
  

  return (
    <>
                <Form onSubmit={handleSubmit(onFormSubmit)} style={{ padding: "3rem 0 3rem", paddingTop: "5rem" }} errors={errors}>

                  <Form.Group className="mt-5 mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="name" name="name"{...register('name')}/>
                      <span>{errors.name?.message}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name="email" {...register('email')}/>
                      <span>{errors.email?.message}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <MDBCheckbox
                    name='role'
                    value='manager'
                    id='flexCheckChecked'
                    label='Become a Venue Manager?'
                    onChange={() => setSelectedCheckbox(!selectedCheckbox)}
                  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Avatar URL</Form.Label>
                      <Form.Control as="textarea" rows={1} name="avatar" {...register('avatar')}/>
                      <span>{errors.avatar?.message}</span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" {...register('password')}/>
                      <span>{errors.password?.message}</span>
                  </Form.Group>   

              <div className='flex'>
                  <p>Already have a user?</p>
                  <Link to={'/login'}  className='text-decoration-none'>
                      <p style={{marginLeft: "5px", color: "#FFA101"}}>Login here!</p>
                  </Link> 
              </div>

              <Button type="submit">
                  Register
              </Button>
              </Form>
    </>
  )
};

export default RegisterForm;

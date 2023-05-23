import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/styledComponents/mainStyles';
import Form from 'react-bootstrap/Form';
import { apiURL, authLogin } from '../../../utils/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useApiPost from '../../../hooks/useApiPost';
import { loginSchema } from '../../../utils/schema';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
    const [name, setName] = useLocalStorage('username');
    const [avatar, setAvatar] = useLocalStorage('avatar', '');
    const [venueManager, setVenueManager] = useLocalStorage('venueManager');
    const [loginError, setLoginError] = useState("");

    //Validate and handle form 
    const {
      register, 
      handleSubmit,
      formState: { errors, isValid }, 
      
  } = useForm({
      resolver: yupResolver(loginSchema),
  });

  const { data, postData, isLoading, isError } = useApiPost();

  
  async function onFormSubmit(event) {
    if (!isValid) {
      return;
    }
    try {
      await postData(apiURL + authLogin, event);
    } catch (error) {
      setLoginError('Incorrect email or password!');
      console.error('Login failed: ', error);
      return;
    }
    window.location.href = '/';
    setAccessToken(data.accessToken);
    setName(data.name);
    if (data.avatar) {
      setAvatar(data.avatar);
    }
    if (data.venueManager) {
      setVenueManager(data.venueManager);
    }
  }
  
  
    useEffect(() => {
        if (data) {
          console.log("Login: ", data);
            window.location.href = '/';
            setAccessToken(data.accessToken);
            setName(data.name);
            if (data.avatar) {
                setAvatar(data.avatar);
            }
            if (data.venueManager) {
                setVenueManager(data.venueManager);
            }
        }
    }, [data]);

  return (
    <>
        <Form
            style={{ padding: "3rem 0 3rem", paddingTop: "5rem" }}
            onSubmit={handleSubmit(onFormSubmit)}
            errors={errors} // add errors here
        >
            <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" {...register('email')}/> 
                <span>{errors.email?.message}</span>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" {...register('password')}/>
                <span>{errors.password?.message}</span>
            </Form.Group>

            <span className="error " style={{ color: 'red' }}>{loginError}</span>

            <div className="flex mt-2">
              <p>Dont have a user?</p>
              <Link to={'/register'}  className='text-decoration-none'>
                <p style={{marginLeft: "5px", color: "#FFA101"}}>Register here!</p>
              </Link>
            </div>

            <Button type="submit">
              Login
            </Button>
        </Form> 
    </>
  )
};

export default LoginForm;
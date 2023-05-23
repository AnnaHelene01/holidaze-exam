import React, { useState, useEffect } from 'react';
import '../profile.css';
import { Col, Row } from 'react-bootstrap';
import useApiPut from '../../../../hooks/useApiPut';
import { apiURL, holidazeProfiles,  } from '../../../../utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { updateAvatar } from '../../../../utils/schema';

const placeholderAvatar = 'https://github.com/AnnaHelene01/SemesterProject2/blob/main/Img/60111.jpg?raw=true';


const Avatar = () => {
  const userName = localStorage.getItem('name');
  const profileName = localStorage.getItem('username');
  const avatarImage = JSON.parse(localStorage.getItem('avatar'));
  const [avatar, setAvatar] = useLocalStorage('avatar', '');

  
  //const [avatar, setAvatar] = useState('');
  const { data, putData, isLoading, isError } = useApiPut();
  const [profile, setProfile] = useState('');
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

//GET PROFILE 
const { name } = useParams();

async function getProfile() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `${apiURL}${holidazeProfiles}/${name}`,
      options
    );
    const data = await response.json(); // Extract JSON data
    setProfile(data);
   //console.log(data);
    //console.log("Data: ", data); // Log the extracted data
  } catch (error) {
    console.error(error);
  }
}
//console.log(profile);

useEffect (() => {
  if (name && name.trim()) {
    getProfile();
  }
}, [name && name.trim()]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAvatar), // Pass the actual resolver function
  });

  const onSubmit = (data) => {
    putData(`apiURL + holidazeProfiles + / ${profileName}/media`, {
      id: accessToken.userId,
      avatar: data.avatar,
    });
    setAvatar(data.avatar);
    window.location.reload();
    //localStorage.setItem(data)
   console.log(data)
    // console.log("in put data" + data.avatar)

  };

  //  useEffect((data) => {
  //   if (data) {
  //     localStorage.setItem({avatar: JSON.stringify(data)});
  //   }
  //    console.log(data)
  //  }, [data]);

  return (
    <Row className="bg-white p-5">
      <Col className="avatar-container" style={{ maxWidth: '200px' }}>
        <img
          src={avatarImage === null ? placeholderAvatar : avatarImage}
          className="avatar-img"
          alt={userName}
        ></img>
      </Col>
      <Col className="user-container mt-4">
        <h5>Change your avatar?</h5>
        <div className="d-flex update-avatar">
          <input
            type="text"
            placeholder="Place image URL"
            pattern="^https?:\/\/.*\.(?:png|jpg|jpeg)$"
            {...register('avatar')}
          />
          <button onClick={handleSubmit(onSubmit)}>UPDATE AVATAR</button>
        </div>
        {errors.avatar && (
          <span className="text-danger">{errors.avatar.message}</span>
        )}
        {isError && <span className="text-danger">An error occurred</span>}
        {isLoading && <span>Loading...</span>}
      </Col>
    </Row>
  );
};

export default Avatar;

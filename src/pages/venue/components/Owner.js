import React from 'react'
import { Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { apiURL, holidazeVenues } from '../../../utils/constants';
import placeholderUser from '../../../assets/placeholderUser.png'

const Owner = () => {
    const { venueId } = useParams();
    const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '/' + venueId + "?_owner=true");
  
    if (isLoading) {
      return <h1 className="text-center">I am Loading...</h1>;
    }
  
    if (isError) {
      return <h1 className="text-center">An error had occurred</h1>;
    }
  
    const { owner } = dataValues;
    const avatarSrc = owner && owner.avatar ? owner.avatar : placeholderUser;
  
    return (
      <>
          <Col className="w-100 d-flex mt-5" sm="12" md="8" lg="8">
            <img src={avatarSrc} className='owner-avatar' alt={owner ? owner.name : ""}></img>
            <div className='owner-info'>
              <h4>{owner ? owner.name : ""}</h4>
              <p>{owner ? owner.email : ""}</p>
            </div>
          </Col>
      </>
    )
  };
  
  export default Owner;

import React, { useState } from 'react';
import useApi from '../../../hooks/useApi';
import { apiURL, holidazeVenues } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import './media.css';
import placeholderImg from '../../../assets/placeholder.png';
import MediaCarousel from './MediaCarousel';

const Media = () => {
  const { venueId } = useParams();
  const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '/' + venueId);

  if (isLoading) {
    return <h1 className="text-center">I am Loading...</h1>;
  }

  if (isError) {
    return <h1 className="text-center">An error had occurred</h1>;
  }

  const { media, name } = dataValues;

  if (!media || media.length === 0) {
    return <p>No media found for this venue.</p>;
  }

  if (media.length === 1) {
    const imageUrl = media[0];
    if (!imageUrl || !imageUrl.startsWith('http')) {
      return <img src={placeholderImg} alt={name} />;
    }
    return <img src={imageUrl} alt={name} onError={(e) => { e.target.src = placeholderImg; }} />;
  }

  return (
    <MediaCarousel media={media} name={name} placeholderImg={placeholderImg} />
  );
};

export default Media;

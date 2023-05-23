import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { addFavorites, removeFavorites } from '../../../state/favorites/favoriteSlice';
import { useDispatch } from 'react-redux';

const Favorites = ({ id, name, media }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  // Load the favorite state from local storage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (favorites[id]) {
      setIsFavorite(true);
    }
  }, [id]);

  // Save the favorite state to local storage when it changes
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (isFavorite) {
      favorites[id] = { id, name, media };
    } else {
      delete favorites[id];
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [id, name, media, isFavorite]);

  const handleAdd = () => {
    if (!isFavorite) {
      dispatch(addFavorites({ id, name, media, amount: 1 }));
    } else {
      dispatch(removeFavorites(id));
    }
    setIsFavorite(!isFavorite);
  };

  const accessToken = localStorage.getItem('accessToken');

  return (
    <>
      {accessToken ? (
        <button className='favorite' onClick={handleAdd}>
          {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      ) : null}
    </>
  );
};

export default Favorites;

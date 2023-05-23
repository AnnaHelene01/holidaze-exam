import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorites/favoriteSlice'

export const store = configureStore({
  reducer: {
    // This is the store we created above. We can add more than one store,
    // allowing for our app to scale if needed
    favorites: favoriteReducer,
  },
});
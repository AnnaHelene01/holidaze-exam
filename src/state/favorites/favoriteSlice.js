import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  venues: [],
  total: 0,
};

const FAVORITES_KEY = 'my_app_favorites';

const persistedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY));

export const favoriteSlice = createSlice({
  // The name of reducer
  name: 'favorites',
  // The initial state of reducer
  initialState: persistedFavorites || initialState,
  // These are the actions that will be made available
  reducers: {
    clearFavorites: (state) => {
      state.venues = [];
      state.total = 0;
      localStorage.removeItem(FAVORITES_KEY);
    },
    addFavorites: (state, action) => {
      const { id, name, media, amount } = action.payload;
      const existingVenue = state.venues.find((venue) => venue.id === id);

      if (existingVenue) {
        existingVenue.amount += amount;
      } else {
        state.venues.push({ id, name, media, amount });
      }

      state.total += amount;
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state));
    },
    removeFavorites: (state, action) => {
      const venueId = action.payload;
      state.venues = state.venues.filter((venue) => venue.id !== venueId)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state));
    },
  },
});

export const { clearFavorites, addFavorites, removeFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;

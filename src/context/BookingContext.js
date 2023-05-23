import React, { createContext, useState } from 'react';

export const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  return (
    <BookingsContext.Provider value={{ bookings, setBookings }}>
      {children}
    </BookingsContext.Provider>
  );
};
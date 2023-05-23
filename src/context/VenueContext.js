import React, { createContext, useState } from 'react';

export const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);

  return (
    <VenuesContext.Provider value={{ venues, setVenues }}>
      {children}
    </VenuesContext.Provider>
  );
};

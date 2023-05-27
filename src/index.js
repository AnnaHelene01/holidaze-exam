import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { BookingsProvider } from './context/BookingContext';
import { VenuesProvider } from './context/VenueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <VenuesProvider>
          <BookingsProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </BookingsProvider>
          </VenuesProvider>
       </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

import React, { useContext, useEffect, useState } from 'react';
import '../overview/admin.css';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { apiURL, holidazeBookings, holidazeProfiles } from '../../../utils/constants';
import SlideVenues from './components/SlideVenues';
import ListBookingsComponent from './components/ListBookings';
import { BookingsContext } from '../../../context/BookingContext';
import { Button } from '../../../components/styledComponents/mainStyles';
import  Loader  from '../../../components/Loader';

const Bookings = () => {
  const [adminVisible] = useState(false);
  const { name } = useParams();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const profileName = JSON.parse(localStorage.getItem('username'));
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const { setBookings, bookings } = useContext(BookingsContext);

  useEffect(() => {
  async function getBookings() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(`${apiURL}${holidazeProfiles}/${profileName}/venues?_bookings=true`, options);
      const data = await response.json();
      setBookings(data);

      // Fetch customer data for each booking
      const bookingsWithCustomers = await Promise.all(
        data.map(async (venue) => {
          const nestedBookings = venue.bookings;
      
          const nestedBookingsWithCustomers = await Promise.all(
            nestedBookings.map(async (booking) => {
              const bookingId = booking.id;
              if (!bookingId) {
                console.error('Booking ID is undefined:', booking);
                return booking;
              }
      
              const customerResponse = await fetch(`${apiURL}${holidazeBookings}/${bookingId}?_customer=true`, options);
              const customerData = await customerResponse.json();
      
              const updatedBooking = {
                ...booking,
                customer: customerData.customer // Access the customer data from the response
              };
      
              return updatedBooking;
            })
          );
      
          const venueWithCustomers = {
            ...venue,
            bookings: nestedBookingsWithCustomers
          };
      
          return venueWithCustomers;
        })
      );      
      
      setBookings(bookingsWithCustomers);
      setLoading(false); // Set loading state to false when data fetching is complete

    } catch (error) {
      console.error(error);
    }
  }

  getBookings();
}, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className='adminPage'>
        <div className={!adminVisible ? 'page mt-5' : 'page page-with-navbar mt-5'}>
        {loading ? (
          <Loader />
        ) : (
          <Container className='p-5'>
            <div className='adminHeader'>
              <h1 className='adminHeadOne primaryHeader'>Manage</h1>
              <h1 className='adminHeadTwo mt-5'>Holidaze</h1>
            </div> 
            <p>Filter your bookings based on your venues!</p>
            <Col sm="12" className="justify-content-center mb-5">
                <SlideVenues bookings={bookings} setSelectedVenue={setSelectedVenue} />
            </Col>
            <div className='text-center mb-4'>
              <Button onClick={handleRefresh}>
                 REFRESH
              </Button>
            </div>
            <h1>Bookings</h1>
            <div className="content-wrapper">
              <Row>

                <Col sm="12">
                  <div className="table-responsive">
                    <MDBTable align='middle'>
                      <MDBTableHead>
                        <tr>
                          <th scope='col'>Customer</th>
                          <th scope='col'>Room Title</th>
                          <th scope='col'>Guests</th>
                          <th scope='col'>Arrive</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                         <ListBookingsComponent bookings={bookings} selectedVenue={selectedVenue} />
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        )}
        </div>
      </div>
    </>
  );
};

export default Bookings;



 
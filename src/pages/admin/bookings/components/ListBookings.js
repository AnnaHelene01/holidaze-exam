import { MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

const ListBookings = ({ bookings, selectedVenue }) => {
  //Filter through each venue to list out bookings per venue!
  const filteredBookings = selectedVenue
    ? bookings.filter((booking) => booking.name === selectedVenue.name)
    : bookings;

  const placeholderAvatar = 'https://github.com/AnnaHelene01/SemesterProject2/blob/main/Img/60111.jpg?raw=true';

  return (
    <>
      {filteredBookings?.map((bookingGroup) =>
        bookingGroup.bookings.map((booking) => (
          <tr key={booking.id}>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src={booking.customer && booking.customer.avatar && booking.customer.avatar.startsWith('http') ? booking.customer.avatar : placeholderAvatar}
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{booking.customer && booking.customer.name}</p>
                  <p className='text-muted mb-0'>{booking.customer && booking.customer.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>{bookingGroup.name}</p>
              <p className='text-muted mb-0'>Cabin</p>
            </td>
            <td>{booking.guests}</td>
            <td>{new Date(booking.dateTo).toLocaleDateString('en-GB')}</td>
            <td>
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default ListBookings;

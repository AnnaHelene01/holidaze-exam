import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { apiURL, holidazeProfiles } from '../../../../utils/constants';

const PBookings = () => {

    const { name } = useParams();
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const profileName = JSON.parse(localStorage.getItem("username"));
    const profileEmail = JSON.parse(localStorage.getItem("email"));
    const [bookings, setBookings] = useState([]);
  
      async function getUserBookings() {
          try {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            };
            const response = await fetch(
              `${apiURL}${holidazeProfiles}/${profileName}/bookings`,
              options
            );
            const data = await response.json(); // Extract JSON data
            setBookings(data);
          } catch (error) {
            console.error(error);
          }
        }
        
        useEffect (() => {
          getUserBookings();
        }, [name]);

  return (
    <>
    <Row className='bg-white p-5'>
    <Col>
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr>
                            <th scope='col'>Customer</th>
                            <th scope='col'>Room Title</th>
                            <th scope='col'>Guests</th>
                            <th scope='col'>Arrive</th>
                            <th scope='col'>Leave</th>
                            <th scope='col'>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {bookings.map((booking) => (
                             <tr key={booking.id}>                            
                             <td>
                                <div className='d-flex align-items-center'>
                                <img
                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                    alt='avatar'
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{profileName}</p>
                                    <p className='text-muted mb-0'>{profileEmail}</p>
                                </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Bergens epic house</p>
                                <p className='text-muted mb-0'>Cabin</p>
                            </td>
                            <td>
                                {booking.guests}
                            </td>
                            <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
                            <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
                            <td>
                                <MDBBtn color='link' rounded size='sm'>
                                Edit
                                </MDBBtn>
                            </td>
                            </tr>
 
                        ))}
                        </MDBTableBody>
                    </MDBTable>
                </Col> 
    </Row>
    </>
  )
};

export default PBookings;

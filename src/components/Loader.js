import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <>
    <div className='m-auto'>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner> 
    </div>
    </>
  )
};

export default Loader;


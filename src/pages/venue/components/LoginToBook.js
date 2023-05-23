import React from 'react'
import { Link } from 'react-router-dom';

const LoginToBook = () => {
  return (
    <>
    <Link to="/login">
        <button className='btn-booknow'>
            Login To Book
        </button>
    </Link>
    </>
  )
};

export default LoginToBook;

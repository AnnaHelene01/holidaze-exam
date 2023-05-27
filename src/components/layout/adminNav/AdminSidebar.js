import React, { useState } from 'react';
import './adminNav.css';
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaThLarge,
  FaBars,
  FaUserAlt,
  FaHotel,
} from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { MdTravelExplore } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../../styledComponents/mainStyles';

const ICON_SIZE = 20;

function AdminSidebar() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  //Get user from localStorage
  const userName = JSON.parse(localStorage.getItem('username'));
  //const avatarString = localStorage.getItem('avatar');
  const avatar = JSON.parse(localStorage.getItem('avatar'));

  function logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('venueManager');
    window.location.href = '/';
  }


  const toggleVisible = () => setVisible(!visible);

  return (
    <>
      <div className="mobile-nav d-flex">
        <button className="mobile-nav-btn" onClick={toggleVisible}>
          <FaBars size={24} />
        </button>
      </div>
      <nav className={!visible ? 'adminbar' : ''}>
        <button type="button" className="admin-btn" onClick={toggleVisible}>
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          <NavLink className="adminlogo" to="/">
            <h1>
              <MdTravelExplore className="admin-icon" /> Holidaze
            </h1>
          </NavLink>
          <div className='links admin-top'>
           <NavLink
              to="/"
              className="admin-link text-white"  
            >
              <AiFillHome size={ICON_SIZE} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/admin"
              className={`admin-link ${location.pathname === '/admin' && 'admin-link-active'} ${
                isAdmin && 'text-white'
              }`}
            >
              <FaThLarge size={ICON_SIZE} />
              <span>Overview</span>
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className={`admin-link ${location.pathname === '/admin/bookings' && 'admin-link-active'} ${
                isAdmin && 'text-white'
              }`}
            >
              <FaChartBar size={ICON_SIZE} />
              <span>Bookings </span>
            </NavLink>
            <NavLink
              to={`/admin/venues/${userName}`}
              className={`admin-link ${location.pathname === '/admin/venues' && 'admin-link-active'} ${
                isAdmin && 'text-white'
              }`}
            >
              <FaHotel size={ICON_SIZE} />
              <span>Venues</span>
          </NavLink>
          </div>
        </div>

        <div className={`links ${isAdmin ? '' : 'admin-top'}`}>
          <div className='admin-profile'>
          <NavLink
            to={`/admin/profile/${userName}`}
            className={`admin-link ${location.pathname === '/admin/profile' && 'admin-link-active'} ${
              isAdmin && 'text-white'
            }`}
          >
            {
              avatar ? (
                <>
                <img src={avatar} style={{maxWidth: "30px"}} alt={userName}></img>
                </>
              ) : (
                  <>
                    <FaUserAlt size={ICON_SIZE} />
                  </>
              )
            }
            <span>{userName}</span>
          </NavLink>
          </div>
		  <div className='text-center mt-5 mb-5'>
		 	 <Button onClick={logOut}>Logout</Button>
		  </div>
        </div>
      </nav>
    </>
  );
}

export default AdminSidebar;

import React, { useState, useEffect } from 'react'
import './header.css'
import '../../../utils/constants'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'
import { MdTravelExplore } from 'react-icons/md'
import { Link } from "react-router-dom";
import { Button } from '../../styledComponents/mainStyles'
import { useLocation } from "react-router-dom";



const Header = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const venueManager = localStorage.getItem('venueManager');

  function logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('venueManager');
    window.location.href = '/';
  }


  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  const removeNav = () => {
    setActive("navBar");
  };

  //Check if on homepage to set nav transparent
  const [transparent, setTransparent] = useState(
    location.pathname === "/" ? "header" : "header activeHeader"
  );
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent(
        location.pathname === "/" ? "header activeHeader" : "header"
      );
    } else {
      setTransparent(
        location.pathname === "/" ? "header" : "header activeHeader"
      );
    }
  };
  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", addBg);
    }
    return () => window.removeEventListener("scroll", addBg);
  }, [location.pathname]);
  
    return (
      <section className='navBarSection'>
         <header className={transparent}>
          
            <div className="logoDiv">
              <Link to="/" className="logo flex"><h1><MdTravelExplore className='icon' />  Holidaze</h1></Link>
            </div>
  
            <div className={active}>
              <ul onClick={removeNav} className="navLists flex">
                
                <li className="navItem">
                  <Link to='/' className='navLink' >Home </Link>
                </li>
                <li className="navItem">
                  <Link to='/allvenues' className="navLink">Venues </Link>
                </li>
                {accessToken ? (
                  <>
                    {venueManager === 'true' ? (
                      <li className='navItem'>
                        <Link to='/admin' className='navLink'>
                          Admin{' '}
                        </Link>
                      </li>
                    ) : (
                      <li className='navItem'>
                        <Link to='/profile:name' className='navLink'>
                          Profile{' '}
                        </Link>
                      </li>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <li className="navItem">
                <Link to='/contact' className='navLink' >Contact </Link>
                </li>
                
                <div className="headerBtns flex">
                  {
                    accessToken ? (
                        <>
                      <Button onClick={logOut}>
                          <Link to='/login'>Logout</Link>                
                      </Button>
                        </>
                    ) : (
                      <>
                      <Button className="loginBtn">
                          <Link to='/login'>Login</Link>                
                      </Button>
                      <Button>
                          <Link to='/register'>Sign Up</Link>
                      </Button>
                      </>
                    )
                  }
                
           
                </div>
              </ul>
              <div onClick={removeNav} className="closeNavbar">
                  <AiFillCloseCircle className='icon'/>
                </div>
            </div>
  
            <div onClick={showNav} className="toggleNavbar">
              <TbGridDots className='icon'/>
            </div>
         </header>
      </section>
    )
  };  

export default Header;
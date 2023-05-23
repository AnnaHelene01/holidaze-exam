import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import AdminSidebar from './adminNav/AdminSidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  //Adding a key prop with the current location pathname 
  //to Header component to force React to re-render 
  //the component whenever the route changes, 
  //instead of relying on caching.
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
  }, [location]);

  return (
    <div>
      {isAdmin ? (
        <div className="admin-layout">
          <AdminSidebar isAdmin={isAdmin} />
          <main>{children}</main>
        </div>
      ) : (
        <div className="main-layout">
          <Header key={key} />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
//{!isAdmin && <Header />}
//{isAdmin ? <AdminSidebar /> : <main>{children}</main>}


import React from 'react';
import { Link } from 'react-router';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        📚 <span>Rudra Library</span>
      </div> */}
      <div className="navbar-logo">
        <div className="logo-circle">RL</div>
        <span className="logo-text">Rudra Library</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-new-member">Join</Link></li>
        {/* <li><Link to="/catalog">Catalog</Link></li> */}
        <li><Link to="/about-us">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

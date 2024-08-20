import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <h1>CryptoDash</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/wallet">Wallet</Link>
      </div>
    </nav>
  );
}

export default Navbar;

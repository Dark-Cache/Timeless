import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Assets/timelesslogo.png';
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiBagSimpleLight } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi"; // cancel/close icon

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <div className='navbar'>
      {/* Logo */}
      <img src={logo} alt='timelesslogo' />

      {/* Menu */}
      <div className='nav-menu'>
        <button> Shop + </button>
        <Link to='/allproduct'>ALL PRODUCTS</Link>
        <Link to='/collection'>COLLECTIONS</Link>
        <Link to='/lookbook'>LOOK BOOK</Link>
        <Link to='/about'>ABOUT</Link>
      </div>

      {/* Icons */}
      <div className='nav-search'>
        <div onClick={() => setShowSearch(true)}> 
          <CiSearch />
        </div>

        <div> 
          <PiBagSimpleLight />
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-box" ref={modalRef}>
            <CiSearch className='check' />
            <div className="input-container">
              <input type="text" placeholder="Search..." autoFocus />
              <button className="close-btn" onClick={() => setShowSearch(false)}>
                <TfiClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

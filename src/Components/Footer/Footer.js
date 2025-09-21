import React, { useState } from 'react'
import './Footer.css'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      setSubscribed(true);
    }
  };

  return (
    <div className='footer'>
      <div className='join'>
        <h2>JOIN THE COMMUNITY.</h2>
        
        <div className='subscribe'>
          {subscribed ? (
            <p className="thankyou">Thanks for subscribing!</p>
          ) : (
            <>
              <input 
                type="text" 
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>
                Subscribe <FaArrowRightLong />
              </button>
            </>
          )}
        </div>
      </div>

      <h3>You will receive all the information regarding the next drops.</h3>

      <div className='socials'>
        <h2>FOLLOW US </h2>
        <div className='icons'>
          <a href='https://www.instagram.com/timeless_since1982/' target="_blank" rel="noreferrer"> <FaInstagram /> </a>
          <a href='https://www.tiktok.com/@timelesssince1982' target="_blank" rel="noreferrer"> <FaTiktok /> </a>
          <a href='https://wa.me/2348166514620' target="_blank" rel="noreferrer"> <FaWhatsapp /> </a>
        </div>
      </div>

      <p>© 2025, TIMELESS. All rights reserved.</p>
    </div>
  )
}

export default Footer

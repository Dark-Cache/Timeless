import React from 'react'
import "./Collections.css";
import "../Lookbook/Lookbook.css";

import lookn from '../../Assets/lookbookn.jpg'
import cap from '../../Assets/caps.jpg' 
import tanktop from '../../Assets/blacktanktop.jpg'

import short from '../../Assets/blackshortfront.jpg'
import croptop from '../../Assets/blackcroptop.jpg'
import tshirt from '../../Assets/blackgoldstandard.jpg'


const Collections = () => {
  return (
    
     <div className='collect'>
    
    
              <div className='row-a'>
                <img src={lookn} alt='lookbook' />
                <img src={cap} alt='lookbook' />
                <img src={tanktop} alt='lookbook' />
              </div>
    
              <div className='row-b'>
                <img src={short} alt='lookbook' />
                <img src={croptop} alt='lookbook' />
                <img src={tshirt} alt='lookbook' />
              </div>
              
            </div>

  )
}

export default Collections
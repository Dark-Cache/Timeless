import React from "react";
import "./Home.css";
import intro from '../../Assets/Picdisplay.jpg';
import introVideo from '../../Assets/backgroundvid.mp4';

const Home = () => {
  return (
    
      <div className="display">
      {/* Video Section */}
      <div className="video-container">
        <video src={introVideo} autoPlay muted loop playsInline />
        {/* <h4>Discover the collective</h4> */}
      </div>
      

      {/* Image Section */}
      <div className="display-pic">
        <img src={intro} alt="intro" />
      </div>
    </div>
  );
};

export default Home;

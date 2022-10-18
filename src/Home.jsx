import React, { useState } from "react";
import "./Styles/Home.css";
import "./Styles/Animation.css";
import "animate.css";
import Fade from "react-reveal/Fade";
import ConfettiExplosion from "react-confetti-explosion";
const Home = () => {
  const [date, setDate] = useState("-");
  function updateTimer() {
    let future = Date.parse("November 19, 2022 03:00:00");
    let now = new Date();
    let diff = future - now;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setDate(days);
  }
  setInterval(() => {
    updateTimer();
  }, 1000);

  const bigExplodeProps = {
    force: 0.4,
    duration: 4000,
    particleCount: 80,
    height: 1200,
    width: 1200,
  };
  return (
    <>
      <div className="page-bg"></div>
      <div className="animation-wrapper">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <div className="headingArea">
        {date !== "-" && <ConfettiExplosion {...bigExplodeProps} />}
        <p className="getReadyText">IOT Seniors Presents</p>
        <p className="homePageTitle animate__animated animate__fadeIn">
          {/* COMING SOON */}
          <Fade bottom cascade>
            Reverie'22
          </Fade>
        </p>
        <p className="seniorText animate__animated animate__fadeIn">
          {date} Days To Go
        </p>
        {date !== "-" && <ConfettiExplosion {...bigExplodeProps} />}
      </div>
    </>
  );
};

export default Home;

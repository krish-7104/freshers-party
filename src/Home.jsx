import React, { useState } from "react";
import "./Styles/Home.css";
import "./Styles/Animation.css";
import "animate.css";
const Home = () => {
  const [date, setDate] = useState("");
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
        <p className="getReadyText">Get Ready For</p>
        {/* <p className="getReadyText">By IOT SENIORS</p> */}
        <p className="homePageTitle animate__animated animate__fadeIn">
          {/* COMING SOON */}
          Reverie'22
        </p>
        <p className="seniorText">{date} Days To Go</p>
      </div>
    </>
  );
};

export default Home;

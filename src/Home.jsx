import React from "react";
import "./Styles/Home.css";
import "./Styles/Animation.css";
import "animate.css";
import Fade from "react-reveal/Fade";
import ConfettiExplosion from "react-confetti-explosion";
import { IoLocationSharp } from "react-icons/io5";
import Sponsors from "./Sponsors";
const Home = () => {
  // const [date, setDate] = useState("-");
  // function updateTimer() {
  //   let future = Date.parse("November 19, 2022 00:00:00");
  //   let now = new Date();
  //   let diff = future - now;
  //   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   setDate(days);
  // }
  // setInterval(() => {
  //   updateTimer();
  // }, 1000);
  const bigExplodeProps = {
    force: 0.8,
    duration: 5000,
    particleCount: 150,
    height: 1200,
    width: 1400,
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
        {/* {date === "-" && <p className="loading">getting ready..</p>} */}
        {/* {date !== "-" && ( */}
        <>
          <div className="confetti">
            <ConfettiExplosion {...bigExplodeProps} />
          </div>
          <p className="getReadyText">CSE(IOT) Presents</p>
          <Fade bottom cascade>
            <p className="homePageTitle">Reverie'22</p>
            <p className="homePageTitleMobile">
              Reverie
              <br />
              2022
            </p>
          </Fade>
          {/* <p className="seniorText animate__animated animate__fadeIn">
              {date} Days To Go
            </p> */}
          <p className="esehitext animate__animated animate__fadeIn">
            Get Ready To Make Some Unforgettable Life Memories!
          </p>
          <p className="venue animate__animated animate__fadeIn">
            <a href="https://maps.app.goo.gl/y82omAVcX6dtgrZ88">
              Venue : Darshan Inn <IoLocationSharp className="logo" />
            </a>
            <br />
            19/11/22 16:00 HOURS
          </p>
          <ConfettiExplosion {...bigExplodeProps} />
          <Sponsors />
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default Home;

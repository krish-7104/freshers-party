import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Junior from "./Junior";
import Senior from "./Senior";
import Home from "./Home";
import "./Styles/App.css";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/senior" element={<Senior />} />
          <Route path="/junior" element={<Junior />} />
          <Route path="/details" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

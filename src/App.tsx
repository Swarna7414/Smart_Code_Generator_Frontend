import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Route/Navbar";
import LogoHome from "./Pages/LogoHome";
import People from "./Pages/People";
import AgentLab from "./Pages/AgentLab";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<LogoHome />} />
        <Route path="/" element={<LogoHome />} />
        <Route path="/home" element={<LogoHome />} />
        <Route path="/research" element={<AgentLab />} />
        <Route path="/about" element={<People />} />
      </Routes>
    </>
  );
};

export default App;

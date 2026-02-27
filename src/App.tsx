import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Route/Navbar";
import LogoHome from "./Pages/LogoHome";
import Publications from "./Pages/Publications";
import Courses from "./Pages/Courses";
import JoinUs from "./Pages/JoinUs";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<LogoHome />} />
        <Route path="/" element={<LogoHome />} />
        <Route path="/home" element={<LogoHome />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/join-us" element={<JoinUs />} />
      </Routes>
    </>
  );
};

export default App;

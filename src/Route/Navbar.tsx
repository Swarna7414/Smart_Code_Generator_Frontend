import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../Styles/component.css";
import logoImg from "../assets/reallog.png";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const getScrollY = () =>
      Math.max(
        window.scrollY ?? 0,
        document.documentElement.scrollTop ?? 0,
        document.body.scrollTop ?? 0
      );

    const handleScroll = () => {
      const current = getScrollY();
      const prev = lastScrollY.current;
      if (current <= 8) {
        setNavbarVisible(true);
      } else if (current > prev) {
        setNavbarVisible(false);
      } else if (current < prev) {
        setNavbarVisible(true);
      }
      lastScrollY.current = current;
    };

    const handleWheel = (e: WheelEvent) => {
      const current = getScrollY();
      if (current <= 8) {
        setNavbarVisible(true);
        lastScrollY.current = current;
        return;
      }
      if (e.deltaY > 0) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      lastScrollY.current = getScrollY();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

const navLinkClasses = () =>
  "block px-2.5 py-2 rounded-sm font-medium text-white";

const mobileNavLinkClasses = () =>
  "block px-2.5 py-2 rounded-sm font-medium text-black";

  return (
    <div>
      
      <div
        className={`hidden md:flex md:fixed md:top-0 md:left-0 md:right-0 md:z-50 md:justify-center md:pt-5 transition-transform duration-300 ease-in-out ${
          navbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <header className="flex flex-row items-center gap-6 py-2 px-6 bg-black/70 backdrop-blur-xl border border-white/30 w-fit rounded-4xl">
          <NavLink to="/home" className={navLinkClasses}>Home</NavLink>
        <NavLink to="/news" className={navLinkClasses}>News</NavLink>
        <NavLink to="/research" className={navLinkClasses}>Research</NavLink>
        <NavLink to="/publications" className={navLinkClasses}>Publications</NavLink>
        <NavLink to="/courses" className={navLinkClasses}>Courses</NavLink>
        <NavLink to="/people" className={navLinkClasses}>People</NavLink>
        <NavLink to="/join-us" className={navLinkClasses}>Join us</NavLink>
        </header>
      </div>

      
      <header
        className={`w-full py-2 px-4 fixed top-0 z-50 flex flex-row items-center justify-between md:hidden bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${
          navbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavLink to="/" className="flex items-center flex-shrink-0">
          <img src={logoImg} alt="perceptionintelligencelab" className="h-14 w-auto object-contain" />
        </NavLink>
        <button
          className="text-black text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 text-md p-6 pt-20 bg-white shadow-xl min-h-full">
          <NavLink to="/home" className={mobileNavLinkClasses}>Home</NavLink>
          <NavLink to="/news" className={mobileNavLinkClasses}>News</NavLink>
          <NavLink to="/research" className={mobileNavLinkClasses}>Research</NavLink>
          <NavLink to="/publications" className={mobileNavLinkClasses}>Publications</NavLink>
          <NavLink to="/courses" className={mobileNavLinkClasses}>Courses</NavLink>
          <NavLink to="/people" className={mobileNavLinkClasses}>People</NavLink>
          <NavLink to="/join-us" className={mobileNavLinkClasses}>Join us</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
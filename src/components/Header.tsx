"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrollingDown, setScrollingDown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");

    if (aboutSection) {
      if (window.scrollY < aboutSection.offsetTop) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }
    setScrollingDown(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close the menu after clicking a link
  };

  return (
    <div className="w-full h-24 bg-transparent flex px-14 justify-between fixed z-50 text-black font-semibold items-center text-xl">
      <button
        className="w-12 h-auto text-yellow-500 font-mono text-7xl z-50"
        onClick={() => scrollToSection("home")}
      >
        V
      </button>

      {showNav && (
        <div
          className={`hidden md:flex md:gap-10 gap-5 transition-opacity duration-500 ${
            scrollingDown ? "opacity-0" : "opacity-100"
          }`}
        >
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About Me</button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
        </div>
      )}

      <div className={`flex ${!showNav ? "block" : "md:hidden"} `}>
        <button onClick={toggleMenu} className="text-yellow-500">
          <FaBars
            size={30}
            className={`transition-transform duration-500 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 bg-black text-white w-full h-screen flex flex-col justify-center items-center transition-transform duration-300 ${
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex justify-between p-5">
          <button
            onClick={toggleMenu}
            className={`text-yellow-500 absolute right-14 top-8 transition-transform duration-300 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          >
            <FaTimes size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center ">
        <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-yellow-500 transform transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-yellow-500 transform transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => scrollToSection("about")}
          >
            About Me
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-yellow-500 transform transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-yellow-500 transform transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-yellow-500 transform transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </div>
      </div>
      {showNav && (
        <div
          className={`hidden md:flex transition-opacity duration-500 ${
            scrollingDown ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="p-3 bg-yellow-500 rounded-full text-white font-regular"
          >
            Contact Me
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

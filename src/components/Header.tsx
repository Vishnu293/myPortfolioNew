"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitch from "./ui/ThemeSwitch";
import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import Logo from "@/assets/logo.png"

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
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full h-24 bg-transparent flex px-5 md:px-10 lg:px-14 justify-between fixed z-50 text-black dark:text-white font-semibold items-center text-xl">
      <button
        className="w-14 md:w-auto h-auto text-gold font-mono text-7xl z-50"
        onClick={() => scrollToSection("home")}
      >
        <Image src={Logo} alt="logo.png" width={80}/>
      </button>
      {showNav && (
        <div
          className={`hidden md:flex md:gap-10 gap-5 transition-opacity duration-500 ${scrollingDown ? "opacity-0" : "opacity-100"
            }`}
        >
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About Me</button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
        </div>
      )}
      <span className={`dark:text-foreground md:hidden ${scrollingDown ? "opacity-0" : "opacity-100"
        }`}>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
          aria-label="Toggle Theme"
          title="Toggle Theme"
        >
          <ThemeSwitch />
          <span className="sr-only">Toggle Theme</span>
        </button>
      </span>
      <div className={`flex ${!showNav ? "block" : "md:hidden"} `}>
        <button onClick={toggleMenu} className="text-gold">
          <FaBars
            size={30}
            className={`transition-transform duration-500 ${isMenuOpen ? "rotate-90" : ""
              }`}
          />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 bg-black text-white w-full h-screen flex flex-col justify-center items-center transition-transform duration-300 ${isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
          }`}
      >
        <div className="flex justify-between p-5">
          <button
            onClick={toggleMenu}
            className={`text-gold absolute md:right-14 right-5 top-8 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""
              }`}
          >
            <FaTimes size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={() => scrollToSection("about")}
          >
            About Me
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>
          <button
            className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </div>
      </div>
      {showNav && (
        <div
          className={`hidden md:flex gap-10 items-center transition-opacity duration-500 ${scrollingDown ? "opacity-0" : "opacity-100"
            }`}
        >
          <span className="dark:text-foreground">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
              aria-label="Toggle Theme"
              title="Toggle Theme"
            >
              <ThemeSwitch />

              <span className="sr-only">Toggle Theme</span>
            </button>
          </span>
          <ShimmerButton
            onClick={() => scrollToSection("contact")}
            background="gold"
            shimmerColor="black"
            className="shadow-2xl text-black text-base ont-regular"
          >
            Contact Me
          </ShimmerButton>
        </div>
      )}
    </div>
  );
};

export default Header;

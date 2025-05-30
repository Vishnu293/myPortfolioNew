"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitch from "./ui/ThemeSwitch";
import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";

const sections = ["home", "about", "projects", "skills", "contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrollingDown, setScrollingDown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      setShowNav(window.scrollY < aboutSection.offsetTop);
    }
    setScrollingDown(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      role="banner"
      className="w-full h-24 bg-transparent flex px-5 md:px-10 lg:px-14 justify-between fixed z-50 text-black dark:text-white font-semibold items-center text-xl"
    >
      <button
        onClick={() => scrollToSection("home")}
        aria-label="Scroll to home"
        className="w-14 md:w-auto h-auto text-gold font-mono text-7xl z-50"
      >
        <Image src="/logo.png" alt="Logo" width={80} height={80} priority />
      </button>
      {showNav && (
        <nav
          aria-label="Primary navigation"
          className={`hidden md:flex md:gap-10 gap-5 transition-opacity duration-500 ${scrollingDown ? "opacity-0" : "opacity-100"
            }`}
        >
          {sections.slice(0, 4).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              aria-current="page"
              className="focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              {section === "about"
                ? "About Me"
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      )}
      <span
        className={`dark:text-foreground md:hidden ${scrollingDown ? "opacity-0" : "opacity-100"
          }`}
      >
        <button
          aria-label="Toggle theme"
          title="Toggle Theme"
          className="inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
        >
          <ThemeSwitch />
          <span className="sr-only">Toggle Theme</span>
        </button>
      </span>
      <div className={`flex ${!showNav ? "block" : "md:hidden"}`}>
        <button
          onClick={toggleMenu}
          className="text-gold"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <FaBars
            size={30}
            className={`transition-transform duration-500 ${isMenuOpen ? "rotate-90" : ""
              }`}
          />
        </button>
      </div>
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          role="menu"
          aria-hidden="false"
          className={`fixed top-0 right-0 bg-black text-white w-full h-screen flex flex-col justify-center items-center transition-transform duration-300 ${isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
            }`}
        >
          <div className="flex justify-between p-5 w-full">
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className={`text-gold absolute md:right-14 right-5 top-8 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""
                }`}
            >
              <FaTimes size={30} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {sections.map((section) => (
              <button
                key={section}
                className={`py-3 tracking-tighter font-medium md:text-7xl text-6xl hover:text-gold transform transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                onClick={() => scrollToSection(section)}
                role="menuitem"
              >
                {section === "about"
                  ? "About Me"
                  : section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </nav>
      )}
      {showNav && (
        <div
          className={`hidden md:flex gap-10 items-center transition-opacity duration-500 ${scrollingDown ? "opacity-0" : "opacity-100"
            }`}
          aria-label="Secondary navigation"
        >
          <span className="dark:text-foreground">
            <button
              aria-label="Toggle theme"
              title="Toggle Theme"
              className="inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
            >
              <ThemeSwitch />
              <span className="sr-only">Toggle Theme</span>
            </button>
          </span>
          <ShimmerButton
            onClick={() => scrollToSection("contact")}
            background="gold"
            shimmerColor="black"
            className="shadow-2xl text-black text-base font-regular"
          >
            Contact Me
          </ShimmerButton>
        </div>
      )}
    </header>
  );
};

export default Header;

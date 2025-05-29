"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GiChessBishop,
  GiChessRook,
  GiChessPawn,
  GiChessKing,
  GiChessQueen,
  GiChessKnight,
} from "react-icons/gi";
import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        className="bg-black text-yellow-500 py-4"
        role="contentinfo"
        aria-label="Footer with chess icons and copyright"
      >
        <div className="container mx-auto text-center space-y-4">
          <motion.div
            className="flex justify-center items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 1 } }}
            aria-live="polite"
          >
            <GiChessBishop className="text-white text-sm" aria-hidden="true" />
            <GiChessRook className="text-white text-base" aria-hidden="true" />
            <GiChessKing className="text-white text-xl" aria-hidden="true" />
            <span className="text-yellow-500 text-xl font-semibold">
              &quot;Every Move Counts&quot;
            </span>
            <GiChessQueen className="text-white text-xl" aria-hidden="true" />
            <GiChessKnight className="text-white text-base" aria-hidden="true" />
            <GiChessPawn className="text-white text-sm" aria-hidden="true" />
          </motion.div>
          <p className="text-sm text-gray-400" aria-label="Copyright notice">
            <span className="mr-1">&copy;</span>
            {new Date().getFullYear()} Vishnu C. All rights reserved.
          </p>
        </div>
      </footer>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-black dark:text-white p-3 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300"
          aria-label="Go to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

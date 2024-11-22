"use client"

import { motion } from "framer-motion";
import { GiChessBishop } from "react-icons/gi";
import { GiChessRook } from "react-icons/gi";
import { GiChessPawn } from "react-icons/gi";
import { GiChessKing } from "react-icons/gi";
import { GiChessQueen } from "react-icons/gi";
import { GiChessKnight } from "react-icons/gi";

export default function Footer() {
  return (
    <footer
      className="bg-black text-yellow-500 py-4"
    >
      <div className="container mx-auto text-center space-y-4">
        <motion.div
          className="flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6, duration: 1 } }}
        >
          <GiChessBishop className="text-white text-sm" />
          <GiChessRook className="text-white text-base" />
          <GiChessKing className="text-white text-xl" />
          <span className="text-yellow-500 text-xl font-semibold">
            "Every Move Counts"
          </span>
          <GiChessQueen className="text-white text-xl" />
          <GiChessKnight className="text-white text-base" />
          <GiChessPawn className="text-white text-sm" />
        </motion.div>
        <p className="text-sm text-gray-400">
          <span className="mr-1">&copy;</span>{new Date().getFullYear()} Vishnu C. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

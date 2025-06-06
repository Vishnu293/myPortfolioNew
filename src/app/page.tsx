"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Home";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contactme from "@/components/Contactme";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <motion.div
        className="bg-[url('/bgImages/Bg1.png')] dark:bg-[url('/bgImages/Bg2.png')] w-full min-h-screen bg-white dark:bg-black z-0"
        style={{
          backgroundRepeat: "repeat",
        }}
        animate={{
          backgroundPositionX: ["100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear",
        }}
        role="presentation"
        aria-hidden="true"
      >
        <div
          className="w-full bg-white dark:bg-black"
          style={{ height: "80vh", opacity: "0.95" }}
        >
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contactme />
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

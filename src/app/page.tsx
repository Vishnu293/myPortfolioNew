'use client';
import Bg1 from "@/assets/Bg1.png"
import Bg2 from "@/assets/Bg3.jpg"
import { motion } from "framer-motion";
import Hero from "@/components/Home";
import About from "@/components/About";
import Project from "@/components/Project"
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <motion.div className="w-full min-h-screen bg-white z-0" style={{
      backgroundImage: `url(${Bg1.src})`,
      backgroundRepeat: 'repeat',
    }}
      animate={{
        backgroundPositionX: ["0%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 50,
        ease: "linear",
      }}>
      <div className="w-full bg-white" style={{ height: '80vh', opacity: '0.95' }}>
        <Hero/>
        <About/>
        <Project/>
        <Skills/>
        <Contact/>
      </div>
    </motion.div>
  );
}

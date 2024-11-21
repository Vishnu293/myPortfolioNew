'use client';
import Bg1 from "@/assets/Bg1.png"
import Bg2 from "@/assets/Bg3.jpg"
import { motion } from "framer-motion";
import Hero from "@/components/Home";
import About from "@/components/About";
import Project from "@/components/Project"
import Skill from "@/components/Skill";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects"
import Skills from "@/components/Skills";
import Contactme from "@/components/Contactme";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
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
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contactme />
          <Footer />
          {/* <Contact /> */}
          {/* <Skill/> */}
          {/* <Projects/> */}
        </div>
      </motion.div>
    </div>
  );
}

"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/grid-pattern";

const About = () => {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setInView(true);
      } else {
        setInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full" id="about">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
      />
      <div
        className="md:hidden bg-[url('../assets/king1.png')] dark:bg-[url('../assets/kingb.png')] absolute top-0 left-0 w-1/2 bg-no-repeat opacity-20 md:opacity-100"
        style={{
          backgroundSize: "50% 100%",
          backgroundPosition: "left",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div
        className="md:hidden bg-[url('../assets/queen.png')] dark:bg-[url('../assets/queenb.png')] absolute top-0 right-0 w-1/2 bg-no-repeat opacity-20 md:opacity-100"
        style={{
          backgroundSize: "50% 100%",
          backgroundPosition: "right",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div
        className="hidden bg-[url('../assets/king1.png')] dark:bg-[url('../assets/kingb.png')] md:block absolute top-0 left-0 w-1/2 bg-no-repeat"
        style={{
          backgroundSize: "25% 100%",
          backgroundPosition: "left",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div
        className="hidden bg-[url('../assets/queen.png')] dark:bg-[url('../assets/queenb.png')] md:block absolute top-0 right-0 w-1/2 bg-no-repeat"
        style={{
          backgroundSize: "25% 100%",
          backgroundPosition: "right",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div className="relative w-full mx-auto pt-20">
        <h1 className="text-center text-5xl font-bold mb-6">ABOUT ME</h1>
        <div className="relative mx-auto mt-20 md:w-[70%] w-[80%]">
          <div className="md:w-full">
            <motion.p
              className="md:text-xl leading-relaxed indent-8 text-justify"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              Hello! I'm Vishnu, a passionate Frontend Developer with a strong
              foundation in building dynamic and responsive websites. I
              specialize in using modern web technologies like HTML, CSS,
              JavaScript, and React, with a keen interest in UI/UX design to
              create seamless user experiences.
            </motion.p>
            <motion.p
              className="md:text-xl leading-relaxed indent-8 text-justify mt-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              With a background in Computer Science & Information Technology and
              a strong academic track record, I am driven by the challenge of
              transforming complex ideas into intuitive digital solutions. I
              thrive on collaboration and love to stay up-to-date with the
              latest trends in web development to create innovative and
              high-performing websites. In addition to my technical skills, I focus on clean code,
              optimization, and maintaining best practices in every project I
              work on. Whether building responsive layouts, implementing smooth
              animations, or working with APIs, I ensure that the user
              experience is always at the forefront.
            </motion.p>
            <motion.p
              className="md:text-xl leading-relaxed indent-8 text-justify mt-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              Feel free to explore my portfolio and reach out if you have any
              questions or opportunities for collaboration. Let's build
              something amazing together!
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

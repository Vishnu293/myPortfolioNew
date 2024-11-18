import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import king from "@/assets/king.png";
import king1 from "@/assets/king1.png";
import pp from "@/assets/pp1.png";

const About = () => {
  return (
    <div className="relative min-h-screen" id="about">
      <div
        className="absolute top-0 left-0 w-1/4 bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url(${king1.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full opacity-50 bg-no-repeat md:hidden block -z-10"
        style={{
          backgroundImage: `url(${king.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          minHeight: "100vh",
          height: "100%",
        }}
      ></div>
      <div className="relative w-full mx-auto pt-20">
        <h1 className="text-center text-5xl font-bold mb-6">ABOUT ME</h1>
        <div className="relative mx-auto mt-20 md:w-[70%] w-[80%]">
          <div className="md:w-full md:ml-10">
            <p className="md:text-xl leading-relaxed indent-8 text-justify">
              Hello! I'm Vishnu, a passionate Frontend Developer with a strong
              foundation in building dynamic and responsive websites. I
              specialize in using modern web technologies like HTML, CSS,
              JavaScript, and React, with a keen interest in UI/UX design to
              create seamless user experiences.
            </p>
            <p className="md:text-xl leading-relaxed indent-8 text-justify">
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
            </p>
            <br />
            <br />
            <p className="md:text-xl leading-relaxed indent-8 text-justify">
              Feel free to explore my portfolio and reach out if you have any
              questions or opportunities for collaboration. Let's build
              something amazing together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

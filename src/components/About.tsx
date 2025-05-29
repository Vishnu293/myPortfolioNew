"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/grid-pattern";

type AboutContent = {
  heading: string;
  paragraphs: string[];
};

const About = () => {
  const [inView, setInView] = useState(false);
  const [content, setContent] = useState<AboutContent | null>(null);

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      setInView(rect.top <= window.innerHeight && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    fetch("/contents/aboutContent.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => {});

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!content) {
    return (
      <section
        className="relative min-h-screen w-full"
        id="about"
        aria-label="About me section"
      >
        <GridPattern width={30} height={30} x={-1} y={-1} strokeDasharray={"4 2"} />
        <p className="text-center pt-20" role="status" aria-live="polite">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen w-full"
      id="about"
      aria-label="About me section"
    >
      <GridPattern width={30} height={30} x={-1} y={-1} strokeDasharray={"4 2"} />
      <div
        className="md:hidden bg-[url('/bgImages/king.png')] dark:bg-[url('/bgImages/kingb.png')] absolute top-0 left-0 w-1/2 bg-no-repeat opacity-20 md:opacity-100"
        style={{
          backgroundSize: "50% 100%",
          backgroundPosition: "left",
          minHeight: "100vh",
          height: "100%",
        }}
      />
      <div
        className="md:hidden bg-[url('/bgImages/queen.png')] dark:bg-[url('/bgImages/queenb.png')] absolute top-0 right-0 w-1/2 bg-no-repeat opacity-20 md:opacity-100"
        style={{
          backgroundSize: "50% 100%",
          backgroundPosition: "right",
          minHeight: "100vh",
          height: "100%",
        }}
      />
      <div
        className="hidden bg-[url('/bgImages/king.png')] dark:bg-[url('/bgImages/kingb.png')] md:block absolute top-0 left-0 w-1/2 bg-no-repeat"
        style={{
          backgroundSize: "25% 100%",
          backgroundPosition: "left",
          minHeight: "100vh",
          height: "100%",
        }}
      />
      <div
        className="hidden bg-[url('/bgImages/queen.png')] dark:bg-[url('/bgImages/queenb.png')] md:block absolute top-0 right-0 w-1/2 bg-no-repeat"
        style={{
          backgroundSize: "25% 100%",
          backgroundPosition: "right",
          minHeight: "100vh",
          height: "100%",
        }}
      />
      <div className="relative w-full mx-auto pt-20">
        <h2 className="text-center text-5xl font-bold mb-6">{content.heading}</h2>
        <div className="relative mx-auto mt-20 md:w-[70%] w-[80%]">
          <div className="md:w-full" aria-live="polite" aria-atomic="true">
            {content.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className={`md:text-xl leading-relaxed indent-8 text-justify${i === 0 ? "" : " mt-6"}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

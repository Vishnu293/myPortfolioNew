"use client";

import React from "react";
import dynamic from "next/dynamic";

const LazyBoxReveal = dynamic(() => import("@/components/ui/box-reveal"), { ssr: false });
const LazyShimmerButton = dynamic(() => import("@/components/ui/shimmer-button-with-resume"), { ssr: false });

const Hero = () => {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="text-black dark:text-white relative w-full min-h-screen mx-auto flex items-center justify-center"
    >
      <div>
        <LazyBoxReveal boxColor="gold" duration={0.2}>
          <h1 className="font-semibold text-4xl md:text-7xl lg:text-8xl mb-4">
            Hi, I&apos;m Vishnu C
          </h1>
        </LazyBoxReveal>
        <LazyBoxReveal boxColor="gold" duration={0.3}>
          <h2 className="font-regular text-4xl md:text-7xl lg:text-8xl mb-10 md:mb-14">
            Front End Developer
          </h2>
        </LazyBoxReveal>
        <LazyBoxReveal boxColor="gold" duration={0.4}>
          <LazyShimmerButton
            filePath="/docs/resumeVishnuC.pdf"
            background="gold"
            shimmerColor="black"
            className="shadow-2xl text-black font-medium text-xs md:text-base lg:text-xl"
            aria-label="Download my resume"
          >
            My Resume
          </LazyShimmerButton>
        </LazyBoxReveal>
      </div>
    </section>
  );
};

export default Hero;

"use client"

import React from "react";
import BoxReveal from "@/components/ui/box-reveal";
import ShimmerButtonWithDownload from "@/components/ui/shimmer-button-with-resume";

const Hero = () => {
  return (
    <div
      id="home"
      className="text-black dark:text-white relative w-full min-h-screen mx-auto flex items-center justify-center"
    >
      <div className="">
        <BoxReveal boxColor={"gold"} duration={0.2}>
          <h1 className="font-semibold text-4xl md:text-7xl lg:text-8xl mb-4">
            Hi, I&apos;m Vishnu C
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={"gold"} duration={0.3}>
          <h1 className="font-regular text-4xl md:text-7xl lg:text-8xl mb-10 md:mb-14">
            Front End Developer
          </h1>
        </BoxReveal>
        <BoxReveal boxColor={"gold"} duration={0.4}>
          <ShimmerButtonWithDownload
            filePath="/docs/resumeVishnuC.pdf"
            background="gold"
            shimmerColor="black"
            className="shadow-2xl text-black font-medium text-xs md:text-base lg:text-xl"
          >
            My Resume
          </ShimmerButtonWithDownload>
        </BoxReveal>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
}

const BoxReveal = ({ children, width = "fit-content", boxColor, duration }: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const triggerAnimations = useCallback(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    }
  }, [isInView, slideControls, mainControls]);

  useEffect(() => {
    triggerAnimations();
  }, [triggerAnimations]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden", willChange: "transform" }}>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration || 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration || 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor || "#5046e6",
        }}
      />
    </div>
  );
};

export default BoxReveal;

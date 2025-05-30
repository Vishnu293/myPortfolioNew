"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GridPattern from "./ui/grid-pattern";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ShimmerButton from "./ui/shimmer-button";
import Image from "next/image";
import { SiGithub } from "react-icons/si";

type Project = {
  category: string;
  title: string;
  images: string[];
  content: string;
  github: string;
};

const getStyles = (idx: number) => {
  const isWhite = idx % 2 === 0;
  return {
    isWhite,
    bgColor: isWhite ? "bg-white dark:bg-black" : "bg-black dark:bg-white",
    textColor: isWhite ? "text-black dark:text-white" : "text-white dark:text-black",
    borderColor: isWhite ? "border-black dark:border-white" : "border-white dark:border-black",
    hoverBgColor: isWhite ? "hover:bg-black dark:hover:bg-white" : "hover:bg-white dark:hover:bg-black",
    hoverTextColor: isWhite
      ? "group-hover:text-white dark:group-hover:text-black"
      : "group-hover:text-black dark:group-hover:text-white",
    hoverBorderColor: isWhite
      ? "hover:border-white dark:hover:border-black"
      : "hover:border-black dark:hover:border-white",
  };
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    fetch("/contents/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedProject]);

  const openModal = (idx: number) => setSelectedProject(idx);
  const closeModal = () => setSelectedProject(null);

  return (
    <section className="relative h-auto w-full pb-10" id="projects" aria-labelledby="projects-heading">
      <GridPattern width={30} height={30} x={-1} y={-1} strokeDasharray={"4 2"} />

      <div className="relative w-full pt-20">
        <h1 id="projects-heading" className="text-center text-5xl font-bold mb-20" tabIndex={-1}>
          PROJECTS
        </h1>

        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center max-w-md md:max-w-xl lg:max-w-6xl">
          {projects.map((project, idx) => {
            const { bgColor, textColor, borderColor, hoverBgColor, hoverTextColor, hoverBorderColor } = getStyles(idx);

            return (
              <motion.article
                key={idx}
                role="listitem"
                tabIndex={0}
                aria-describedby={`project-desc-${idx}`}
                className={`w-full shadow-2xl max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[360px] aspect-square
                relative cursor-pointer rounded-xl overflow-hidden
                ${bgColor} ${textColor} border-2 ${borderColor}
                transition-colors duration-300 group ${hoverBgColor} ${hoverTextColor} ${hoverBorderColor}`}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => openModal(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(idx);
                  }
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 ${textColor} ${hoverTextColor}`}>
                  <span className="hidden sm:block select-none pointer-events-none mb-4 text-[clamp(3rem,5vw,6rem)]" aria-hidden="true">♝</span>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-center px-2" id={`project-desc-${idx}`}>
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-center p-2">(click here)</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedProject !== null && projects[selectedProject] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              onClick={closeModal}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative h-[80vh] w-[600px] md:w-[800px] bg-white dark:bg-black rounded-2xl border-2 border-black dark:border-white shadow-2xl flex flex-col overflow-hidden"
              >
                <ShimmerButton
                  onClick={closeModal}
                  shimmerColor="black"
                  background="gold"
                  className="absolute bottom-4 right-4 w-20 shadow-2xl font-medium py-2 px-4 text-black"
                  aria-label="Close Modal"
                >
                  Close
                </ShimmerButton>

                <Swiper
                  modules={[Navigation, Thumbs]}
                  navigation
                  className="w-full max-h-[400px] bg-white dark:bg-black rounded-t-xl md:mt-6"
                >
                  {projects[selectedProject].images.map((imgUrl, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={imgUrl}
                        alt={`${projects[selectedProject].title} screenshot ${index + 1}`}
                        width={800}
                        height={400}
                        className="w-full h-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="p-6 md:p-8 text-black dark:text-white flex flex-col gap-4" id="modal-desc">
                  <div>
                    <p className="uppercase text-sm tracking-widest text-gray-600 dark:text-gray-400">
                      {projects[selectedProject].category}
                    </p>
                    <h2 className="text-3xl font-bold mt-1" id="modal-title">
                      {projects[selectedProject].title}
                    </h2>
                  </div>
                  <p className="text-base leading-relaxed">{projects[selectedProject].content}</p>

                  <div className="flex gap-4 mt-4">
                    {projects[selectedProject].github ? (
                      <a
                        href={projects[selectedProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg transition text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-300"
                      >
                        <SiGithub className="w-5 h-5 mr-2" />
                        GitHub Repo
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-4 py-2 bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg cursor-not-allowed text-sm font-medium"
                      >
                        <SiGithub className="w-5 h-5 mr-2" />
                        GitHub Repo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

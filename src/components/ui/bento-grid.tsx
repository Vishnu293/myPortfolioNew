"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-[80vh] md:h-[80vh] md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full grid grid-cols-2 md:grid-cols-4 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title+index}
            onClick={() => setActive(card)}
            className={`p-4 flex flex-col rounded-xl cursor-pointer ${card.bgColor}`}
          >
            <div className="flex gap-2 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className={`"font-medium ${card.textColor} text-center md:text-left text-base`}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Using HTML, CSS, JavaScript",
    title: "Personal Portfolio Website",
    bgColor: "bg-black",
    textColor: "text-white",
    src: "https://i.postimg.cc/CLyj4H2z/portfolio-old.png",
    ctaText: "Github",
    ctaLink: "https://github.com/Vishnu293/vishnu_portfolio",
    content: () => {
      return (
        <main>
          <b>Description:</b> Designed and developed a personal portfolio website to showcase my skills, projects, and achievements.<br />
          <b>Technologies Used:</b> HTML, CSS, JSX<br />
          <b>Key Features:</b>
          <ul>
            <li>Implemented a responsive and user-friendly design.</li>
            <li>Create interactive and dynamic components using React.</li>
            <li>Structured content with JSX and styled with CSS.</li>
            <li>Showcases projects, skills, and achievements.
            </li>
          </ul>
        </main>
      );
    },
  },
  {
    description: "Using MERN Stack",
    title: "ValueVue",
    bgColor: "bg-white",
    textColor: "text-black",
    src: "https://i.postimg.cc/Prm1VvGK/valuevue.png",
    ctaText: "Github",
    ctaLink: "https://github.com/Vishnu293/ValueVue-Frontend",
    content: () => {
      return (
        <main>
          <b>Description:</b> ValueVue addresses the challenges traditional stores face from e-commerce giants by integrating local businesses into the digital sphere. Developed as part of my B.Tech final year project, it aims to enhance the retail experience for both customers and retailers.<br />
          <b>Technologies Used:</b> MERN Stack (MongoDB, Express.js, React.js, Node.js)<br />
          <b>Key Features:</b>
          <ul>
            <li>Implemented a responsive and user-friendly design.</li>
            <li>Created interactive components with React.</li>
            <li>Developed a robust backend with Node.js and Express.js for real-time updates.</li>
            <li>Efficient data handling with MongoDB.
            </li>
            <li>Ensured secure user data with authentication and authorization.</li>
            <li>Enabled customers to find nearby stores with price and proximity filters..</li>
            <li>Empowered retailers to showcase products and drive foot traffic.
            </li>
          </ul>
        </main>
      );
    },
  },
  {
    description: "Using Next.js, Tailwind CSS, Framer Motion",
    title: "Personal Portfolio Website New",
    bgColor: "bg-black",
    textColor: "text-white",
    src: "https://i.postimg.cc/3JHvGryG/portfolio-new.png",
    ctaText: "Github",
    ctaLink: "https://github.com/Vishnu293/nPortfolio",
    content: () => {
      return (
        <main>
          <b>Description:</b> ValueVue addresses the challenges traditional stores face from e-commerce giants by integrating local businesses into the digital sphere. Developed as part of my B.Tech final year project, it aims to enhance the retail experience for both customers and retailers.<br />
          <b>Technologies Used:</b> MERN Stack (MongoDB, Express.js, React.js, Node.js)<br />
          <b>Key Features:</b>
          <ul>
            <li>Implemented a responsive and user-friendly design.</li>
            <li>Created interactive components with React.</li>
            <li>Developed a robust backend with Node.js and Express.js for real-time updates.</li>
            <li>Efficient data handling with MongoDB.
            </li>
            <li>Ensured secure user data with authentication and authorization.</li>
            <li>Enabled customers to find nearby stores with price and proximity filters..</li>
            <li>Empowered retailers to showcase products and drive foot traffic.
            </li>
          </ul>
        </main>
      );
    },
  },
  {
    description: "Using MERN Stack.",
    title: "ValueVue New",
    bgColor: "bg-white",
    textColor: "text-black",
    src: "https://i.postimg.cc/Prm1VvGK/valuevue.png",
    ctaText: "Github",
    ctaLink: "https://github.com/Vishnu293/ValueVue-Frontend",
    content: () => {
      return (
        <main>
          <b>Description:</b> ValueVue addresses the challenges traditional stores face from e-commerce giants by integrating local businesses into the digital sphere. Developed as part of my B.Tech final year project, it aims to enhance the retail experience for both customers and retailers.<br />
          <b>Technologies Used:</b> MERN Stack (MongoDB, Express.js, React.js, Node.js)<br />
          <b>Key Features:</b>
          <ul>
            <li>Implemented a responsive and user-friendly design.</li>
            <li>Created interactive components with React.</li>
            <li>Developed a robust backend with Node.js and Express.js for real-time updates.</li>
            <li>Efficient data handling with MongoDB.
            </li>
            <li>Ensured secure user data with authentication and authorization.</li>
            <li>Enabled customers to find nearby stores with price and proximity filters..</li>
            <li>Empowered retailers to showcase products and drive foot traffic.
            </li>
          </ul>
        </main>
      );
    },
  },
];

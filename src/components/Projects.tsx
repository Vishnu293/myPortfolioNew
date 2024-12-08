"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/chess-board";
import { motion } from "framer-motion";
import {
    IconX,
} from "@tabler/icons-react";
import GridPattern from "@/components/ui/grid-pattern";
import ShimmerButton from "./ui/shimmer-button";

type Card = {
    category: string;
    title: string;
    content: string;
    src: string;
    githubUrl: string;
};

export function Projects() {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isLg, setIsLg] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLg(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isLg) {
            setSelectedCard(data[0]);
            setIsSelected(true);
        } else {
            setSelectedCard(null);
            setIsSelected(false);
        }
    }, [isLg]);

    const handleCardSelection = (card: Card) => {
        setSelectedCard(card);
        setIsSelected(true);
    };

    const handleClose = () => {
        setIsSelected(false);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const cards = data.map((card, index) => (
        <Card
            key={card.src}
            card={card}
            index={index}
            onHoverEnter={handleMouseEnter}
            onHoverLeave={handleMouseLeave}
            isBlurred={hoveredIndex !== null && hoveredIndex !== index}
        />
    ));

    const animationVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="relative w-full" id="projects">
            <div className="relative w-full pt-20">
                <h1 className="text-center text-5xl font-bold mb-20"><GridPattern
                    width={30}
                    height={30}
                    x={-1}
                    y={-1}
                    strokeDasharray={"4 2"}
                />PROJECTS</h1>
                <div className="flex flex-col md:flex-row justify-between items-center relative">
                    <div className={`w-full md:w-[40%] h-full relative`}>
                        {isSelected && selectedCard && (
                            <div className="relative w-[90%] h-full shadow-lg mx-auto rounded-3xl bg-white dark:bg-black dark:text-white">
                                <motion.div
                                    key={selectedCard.title}
                                    className="flex flex-col gap-5 p-5 justify-center"
                                    initial="hidden"
                                    animate="visible"
                                    variants={animationVariants}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    {!isLg && (
                                        <button
                                            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
                                            onClick={handleClose}
                                        >
                                            <IconX />
                                        </button>
                                    )}

                                    <div className="mx-auto h-[200px]">
                                        <Image
                                            src={selectedCard.src}
                                            alt={selectedCard.title}
                                            width={300}
                                            height={300}
                                            className="object-contain w-full h-full mx-auto"
                                        />
                                    </div>
                                    <div className="h-[200px] overflow-auto scrollbar-hide">
                                        <p className="text-2xl text-center">{selectedCard.title}</p>
                                        <p className="text-xl text-center">{selectedCard.category}</p><br />
                                        <p>{selectedCard.content}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <a
                                            href={selectedCard.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ShimmerButton
                                                borderRadius="0"
                                                shimmerColor="black"
                                                background="gold"
                                                className="w-20 shadow-2xl text-black font-medium py-2 px-4"

                                            >
                                                Github
                                            </ShimmerButton>
                                        </a>
                                    </div>

                                </motion.div>
                            </div>
                        )}
                    </div>

                    <div className={`w-full md:w-[60%] p-5 md:pr-0 h-full relative ${isSelected ? 'hidden md:block' : ''}`}>
                        <div className="w-full h-full bg-white border-y-2 md:border-r-0 md:border-l-2 border-x-2 border-black">
                            <div style={{ height: '100%', transform: 'scale(1)', transformOrigin: 'top left' }}>
                                <Carousel items={cards} onCardSelect={handleCardSelection} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const data = [
    {
        category: "Using HTML, CSS, JavaScript",
        title: "Personal Portfolio Website",
        src: "https://i.postimg.cc/CLyj4H2z/portfolio-old.png",
        content: "Designed and developed a personal portfolio website to showcase my skills, projects, and achievements.",
        githubUrl: "https://github.com/Vishnu293/vishnu_portfolio"
    },
    {
        category: "Using MERN Stack",
        title: "ValueVue",
        src: "https://i.postimg.cc/Prm1VvGK/valuevue.png",
        content: "ValueVue addresses the challenges traditional stores face from e-commerce giants by integrating local businesses into the digital sphere. Developed as part of my B.Tech final year project, it aims to enhance the retail experience for both customers and retailers.",
        githubUrl: "https://github.com/Vishnu293/ValueVue-Frontend"
    },
    {
        category: "Using Next.js, Tailwind CSS, Framer Motion",
        title: "Personal Portfolio Website New",
        src: "https://i.postimg.cc/Hs5c94GK/portfolio-new.png",
        content: "Designed and developed a personal portfolio website to showcase my skills, projects, and achievements.",
        githubUrl: "https://github.com/Vishnu293/nPortfolio"
    },
];

export default Projects;

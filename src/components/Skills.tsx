"use client"
import React from "react";
import {
    SiPython,
    SiJavascript,
    SiReact,
    SiTailwindcss,
    SiHtml5,
    SiCss3,
    SiTypescript,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiNextdotjs,
    SiFramer,
    SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/grid-pattern";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const Skills = () => {
    const skillRows: IconType[][] = [
        [SiNextdotjs, SiMongodb, SiExpress, SiReact, SiNodedotjs],
        [SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss3],
        [SiPython, FaJava, GrMysql, SiFramer, SiGithub],
    ];
    const skillNames: string[] = [
        "Next.js",
        "Mongodb",
        "Express.js",
        "React.js",
        "Node.js",
        "Javascript",
        "Typescript",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Python",
        "Java",
        "MySQL",
        "Framer-Motion",
        "Github",
    ];

    return (
        <div className="relative h-auto w-full pb-10" id="skills"><GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
        />
            <div className="relative w-full pt-20">
                <h1 className="text-center text-5xl font-bold mb-20">SKILLS</h1>
                <div className="flex flex-col gap-6 w-[80%] mx-auto text-black dark:text-white pt-5 border-black dark:border-white border-2 shadow-2xl">
                    <div className="flex flex-col items-center gap-4 w-[90%] mx-auto ">
                        {skillRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-between w-full">
                                {row.map((Icon, iconIndex) => (
                                    <Icon key={iconIndex} className="lg:text-7xl md:text-5xl text-4xl" />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-black dark:bg-white text-white dark:text-black lg:pb-2">
                        <div className="flex overflow-hidden whitespace-nowrap">
                            {[...Array(2)].map((_, i) => (
                                <motion.h1
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{
                                        repeat: Infinity,
                                        ease: "linear",
                                        duration: 15
                                    }}
                                    key={i}
                                    className="mt-4 pb-4 text-xl font-bold leading-none tracking-tighter md:text-3xl lg:text-5xl"
                                >
                                    {skillNames.map((name, index) => (
                                        <span key={index} className="mr-2">
                                            {name}
                                            {index < skillNames.length - 1 && ", "}
                                        </span>
                                    ))}
                                </motion.h1>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;

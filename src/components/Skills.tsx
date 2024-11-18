import React from 'react';
import Image, { StaticImageData } from 'next/image';
import img1 from '@/assets/queen.png';
import python from '@/assets/python_yellow.png';
import java from '@/assets/java_gold.png';
import c from '@/assets/c_gold.png';
import html from '@/assets/html_gold.png';
import css from '@/assets/css_gold.png';
import js from '@/assets/js_gold.png';
import ts from '@/assets/ts_gold.png';
import react from '@/assets/react_gold.png';
import node from '@/assets/node_gold.png';
import mongodb from '@/assets/mongodb_gold.png';
import express from '@/assets/expressjs_gold.png';
import next from '@/assets/nextjs_gold.png';
import tailwind from '@/assets/tailwind_gold.png';
import mysql from '@/assets/mysql_gold.png';
import sqlite from '@/assets/sqlite_gold.png';
import git from '@/assets/github_gold.png';
import blank from '@/assets/blank.png'

const Skills = () => {
    const generateChessboard = (name: string, imageSet: StaticImageData[]) => {
        const squares = [];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const isBlack = (row + col) % 2 === 1;
                const image = imageSet[(row * 4 + col) % imageSet.length];

                squares.push(
                    <div
                        key={`${row}-${col}`}
                        className={`w-full h-full flex items-center justify-center ${isBlack ? 'bg-black' : 'bg-white'}`}
                    >
                        {image ? (
                            <Image
                                src={image}
                                alt={`Piece on ${row}-${col}`}
                                width={40}
                                height={40}
                                style={{
                                    objectFit: "fill"
                                }}
                            />
                        ) : null}
                    </div>
                );
            }
        }

        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="grid grid-cols-4 gap-0 w-full h-full">{squares}</div>
                <p className="mt-2 text-center text-black font-medium">{name}</p>
            </div>
        );
    };

    const frontendImages = [html, css, js, react, next, ts, tailwind, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
    const backendImages = [node, express, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
    const programmingLanguagesImages = [python, java, c, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];
    const databasesImages = [mongodb, mysql, sqlite, git, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank];

    return (
        <div className="relative h-screen" id='skills'>
            <div className="relative h-full mx-auto w-full pt-20 pb-10 flex flex-col gap-[5%]">
                <h1 className="h-[10%] text-center text-5xl font-bold">
                    SKILLS
                </h1>
                <div className="grid grid-cols-[40%,auto,40%] grid-rows-[45%,auto,45%] w-[90%] h-[85%] mx-auto">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[100%] h-[100%]">{generateChessboard('Frontend Development', frontendImages)}</div>
                    </div>
                    <div className="w-full h-full col-span-1 row-span-3 flex items-center justify-center bg-transparent">
                        <Image
                            src={img1}
                            alt="Central Image"
                            width={128}
                            height={128}
                            className="object-contain"
                        />
                    </div>

                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[100%] h-[100%]">{generateChessboard('Backend Development', backendImages)}</div>
                    </div>
                    <div className="w-full h-full bg-white"></div>
                    <div className="w-full h-full bg-white"></div>
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[100%] h-[100%]">{generateChessboard('Programming Languages', programmingLanguagesImages)}</div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[100%] h-[100%]">{generateChessboard('Databases & Version C', databasesImages)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;

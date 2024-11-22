"use client";

import React from "react";
import { ExpandableCardDemo } from "./ui/bento-grid";

const Project = () => {
    return (
        <div className="relative min-h-screen" id="projects">
            <div className="relative w-full mx-auto pt-20 pb-16">
                <h1 className="text-center text-5xl font-bold mb-20">PROJECTS</h1>
                <div style={{ width: "80%", margin: "auto" }}>
                    <ExpandableCardDemo />
                </div>
            </div>
        </div>
    )
}

export default Project;

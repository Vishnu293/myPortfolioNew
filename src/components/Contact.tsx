import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-regular-svg-icons';
import { motion, useAnimate } from 'framer-motion';
import GridPattern from "@/components/ui/grid-pattern";

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [scope, animate] = useAnimate();

    const emailInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Message:', message);
        setEmail('');
        setMessage('');
    };

    const handleAnimate = async () => {
        await animate('#target', { y: 120 }); // Vertical move
        await animate('#target', { x: 100 }); // Horizontal move
    };

    const handleAnimateBack = async () => {
        // Move the knight back in an "L" shape to the initial position
        await animate('#target', { x: 100 }); // First move horizontally
        await animate('#target', { y: 120 }); // Then move vertically
        await animate('#target', { x: 0 }); // Move back horizontally to the input field
        await animate('#target', { y: 0 }); // Move back vertically to the input field
    };

    return (
        <div className="relative" id="contact"><GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
        />
            <div className="relative w-full mx-auto pt-20 pb-16">
                <h1 className="text-center text-5xl font-bold mb-8">CONTACT ME</h1>
                <div className="flex justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="p-8 rounded-lg w-full md:w-1/2 relative"
                    >
                        {/* Email Input */}
                        <div className="mb-6 relative">
                            <div className="relative flex items-center">
                                {/* Motion Knight Icon */}
                                <div
                                    ref={scope}
                                    className="relative"
                                >
                                    <FontAwesomeIcon
                                        id="target"
                                        icon={faChessKnight}
                                        size="2xl"
                                        style={{ color: '#000000' }}
                                    />
                                </div>

                                <input
                                    ref={emailInputRef}
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => handleAnimateBack()} // Reset knight position when email is focused
                                    className="w-full h-12 px-4 bg-gray-400 text-white rounded-lg placeholder:text-gray-600 outline-none pl-12" // Added padding to make space for knight
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="mb-6 relative">
                            <div className="flex justify-end relative">
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onFocus={() => handleAnimate()}
                                    // Trigger knight move when message field is focused
                                    className="w-[80%] h-36 px-4 bg-gray-400 text-white placeholder:text-gray-600 rounded-lg outline-none"
                                    placeholder="Enter your message"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;

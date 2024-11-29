import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
    const [currentText, setCurrentText] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const jobTexts = [
        { title: 'Find Your Dream Job Today', description: 'Join top employers and discover exciting opportunities. Your next career is just a click away!' },
        { title: 'Remote Opportunities', description: 'Work from anywhere! Access global job listings that offer remote work options.' },
        { title: 'Advance Your Career', description: 'Looking to grow? Discover jobs that challenge you and help you build your skills.' },
        { title: 'Tech Jobs for Innovators', description: 'Join the tech revolution! Explore cutting-edge roles in software, AI, and more.' },
        { title: 'Creative Careers Await', description: 'If you have a passion for design, marketing, or content creation, we have opportunities for you.' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentText((prev) => (prev + 1) % jobTexts.length);
                setIsFading(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[53vh] sm:h-[60vh] md:h-[44vh] lg:h-[80vh] xl:h-[80vh] mt-4 bg-gradient-to-r from-sky-400 to-teal-500 text-white dark:from-gray-900 dark:to-gray-700">
            <div className="h-full w-full flex justify-center items-center">
                <div className="w-full text-center lg:text-left px-6 sm:px-10 lg:px-20 py-10">
                    <div className="w-full">
                        <h1
                            className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-800 dark:text-white transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            {jobTexts[currentText].title}
                        </h1>
                        <p
                            className={`mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            {jobTexts[currentText].description}
                        </p>
                        <button onClick={()=> navigate("/jobs")} className="mt-6 text-center py-3 px-6 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

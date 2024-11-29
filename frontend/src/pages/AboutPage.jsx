import Footer from '@/components/component/Footer';
import NavBar from '@/components/component/NavBar';
import React from 'react';

const AboutPage = () => {
    return (
        <div className="flex app m-auto flex-col min-h-screen">
            <NavBar />

            <div className=" flex-grow mt- bg-gradient-to-r  via-indigo-800 to-blue-900 flex justify-center items-center bg-cover bg-center">
                <div className="bg-black mt-9 mb-9 p-8 rounded-lg shadow-xl max-w-4xl w-full opacity-0 animate-fadeIn">
                    <h1 className="text-4xl font-semibold text-center text-white mb-6 transition duration-500 ease-in-out transform hover:scale-105 hover:text-indigo-300">
                        Welcome to My Demo Project
                    </h1>

                    <p className="text-lg text-gray-300 text-center mb-6 opacity-0 animate-fadeIn animate-delay-1000">
                        This is a learning project created to explore and improve my web development skills.
                    </p>

                    <p className="text-md text-gray-400 opacity-0 animate-fadeIn animate-delay-1500">
                        This website is a simple demonstration of my journey into web development. I am exploring
                        various tools, frameworks, and best practices to enhance my knowledge and build
                        responsive, user-friendly interfaces. The goal of this project is to experiment with
                        React, modern CSS, web design principles, and backend technologies like Node.js and Express.
                    </p>

                    {/* Technologies Cards */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <h3 className="text-xl font-medium text-indigo-300 col-span-full mb-4 opacity-0 animate-fadeIn animate-delay-2000">
                            Technologies Used:
                        </h3>

                        {/* Individual Technology Cards */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-2200">
                            <h4 className="text-2xl font-semibold mb-4">React.js</h4>
                            <p className="text-sm">A powerful JavaScript library for building user interfaces.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-2400">
                            <h4 className="text-2xl font-semibold mb-4">Tailwind CSS</h4>
                            <p className="text-sm">A utility-first CSS framework for creating responsive designs.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-2600">
                            <h4 className="text-2xl font-semibold mb-4">JavaScript</h4>
                            <p className="text-sm">The core language for front-end and back-end development.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-2800">
                            <h4 className="text-2xl font-semibold mb-4">Node.js</h4>
                            <p className="text-sm">JavaScript runtime for building scalable back-end applications.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-3000">
                            <h4 className="text-2xl font-semibold mb-4">Express</h4>
                            <p className="text-sm">Minimal and flexible Node.js web application framework.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white opacity-0 animate-fadeIn animate-delay-3200">
                            <h4 className="text-2xl font-semibold mb-4">MongoDB</h4>
                            <p className="text-sm">A NoSQL database for high-performance, scalable applications.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;

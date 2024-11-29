import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    return (
        <div className="bg-gray-800 text-white p-10">
            <div className="mx-auto max-w-screen-xl px-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">CareerLinker</h3>
                        <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                        <div className="flex gap-4 mt-7">
                            <a href="#" className="text-white hover:text-blue-500 transition-colors duration-200">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-pink-500 transition-colors duration-200">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-blue-700 transition-colors duration-200">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Company</h3>
                        <ul className="space-y-2">
                            <li onClick={() => user.role ? navigate("/admin/companies") : navigate('/')}><a className="text-sm hover:text-gray-400 transition-colors duration-200">Home</a></li>
                            <li onClick={() => navigate('/about')} ><a className="text-sm cursor-pointer hover:text-gray-400 transition-colors duration-200">About Us</a></li>
                            <li><a href="/" className="text-sm hover:text-gray-400 transition-colors duration-200">Privacy and Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
                        <p className="text-sm mb-2">+91 979-460-3102</p>
                        <p className="text-sm">samratsuraj10@gmail.com</p>
                    </div>

                </div>
                <div className="w-full h-1 bg-gray-600 mt-12"></div>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>&copy; 2024 CareerLinker. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;

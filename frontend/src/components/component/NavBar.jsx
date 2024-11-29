import React, { useEffect, useState } from 'react';
import { Moon, SearchIcon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/redux/modeSlice';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { setGlobeSearchJobQuery } from '@/redux/jobSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth)
    const { mode } = useSelector((store) => store.mode);

    
    const [input, setInput] = useState("")

    const onChangeHander = (e) => {
        setInput(e.target.value)
    }

    const onClickHander = () => {
        dispatch(setGlobeSearchJobQuery(input))
        navigate("/search")
    }

    useEffect(() => {
        if (mode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    const toggleDarkMode = () => {
        dispatch(setMode(!mode));
    };

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [])


    const logOutHander = async () => {
        try {
            const res = await axios.post("https://full-stack-job-port-3-0.onrender.com/api/user/logout", {}, { withCredentials: true })
            if (res.data.success) {
                navigate("/auth")
                dispatch(setUser(""))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.success(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-between items-center app mt-5 px-4 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4 font-sans">
                <div
                    className="text-blue-500 font-bold text-xs sm:text-sm md:text-xl lg:text-4xl cursor-pointer"
                    onClick={() => user.role === "admin" ? navigate("/admin/companies") : navigate('/')}
                >
                    CareerLinker
                </div>
            </div>

            <div className="flex gap-2 lg:gap-4 items-center">

                {user && (
                    user?.role === "admin" ? <></>
                        : <div className="gap-1 hidden sm:flex items-center">
                            <Input onChange={onChangeHander} placeholder="Search Jobs Name" className="h-8 text-xs sm:text-xs md:text-sm lg:text-base" />
                            <SearchIcon onClick={onClickHander} className="dark:text-white cursor-pointer h-6 w-6 rounded-lg text-black" />
                        </div>
                )}

                {mode ? (
                    <Moon
                        onClick={toggleDarkMode}
                        className="h-6 w-6 cursor-pointer rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    />
                ) : (
                    <Sun
                        onClick={toggleDarkMode}
                        className="h-6 w-6 cursor-pointer rounded-full p-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    />
                )}

                {user ? (
                    <div className="flex items-center gap-1 lg:gap-3">
                        {
                            user?.role === "admin"
                                ? <button
                                    onClick={() => navigate('/admin/jobs')}
                                    className="font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1  hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                >
                                    Jobs
                                </button>
                                : <button
                                    onClick={() => navigate('/jobs')}
                                    className="font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1  hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                >
                                    Jobs
                                </button>
                        }
                        {
                            user?.role == "admin"
                                ? <button
                                    onClick={() => navigate("/admin/companies")}
                                    className="font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                >
                                    Companies
                                </button>
                                : <button
                                    onClick={() => navigate("/profile")}
                                    className="font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                >
                                    Profile
                                </button>
                        }
                        <button onClick={logOutHander} className="bg-red-600 text-white font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1 rounded hover:bg-red-700 transition-colors">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/auth")}
                            className="bg-blue-600 text-white font-bold text-xs sm:text-xs md:text-sm lg:text-base px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                            SignUp
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;

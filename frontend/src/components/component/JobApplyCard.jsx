import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import useGetJobById from '@/hooks/useGetJobById';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const JobApplyCard = () => {
    const params = useParams()
    useGetJobById(params.id)
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const { singleJobs } = useSelector(store => store.job)

    const isInitApplied = singleJobs?.applications?.some(applicant => applicant?._id === user?._id) || false
    const [hasApplied, setHasApplied] = useState(isInitApplied);


    useEffect(()=>{
        setHasApplied(singleJobs?.applications?.some(application => application?.applicant === user._id))
    },[params.id, dispatch, user?._id])

    const JobApplyHander = async () => {
        try {
            const res = await axios.post(`https://job-port-dryp.onrender.com/api/application/apply/${params.id}`, {}, { withCredentials: true })
            if (res.data.success) {
                toast.success(res?.data?.message)
                setHasApplied(true)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6 mt-9 mb-11 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >

            <div className="flex items-center gap-2 mb-4">
                <img src={singleJobs?.company?.logo ? singleJobs?.company?.logo : "https://www.pikpng.com/pngl/b/77-777788_1000-x-1000-0-no-logo-available-png.png"} alt="Company Logo" className="w-12 h-12 rounded-full object-cover" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{singleJobs?.title}</h1>
            </div>

            <div className="flex justify-between items-center shadow-sm rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-green-400 text-xs md:text-sm">{singleJobs?.position}</Badge>
                    <Badge variant="outline" className="text-red-500 text-xs md:text-sm">{singleJobs?.jobType}</Badge>
                    <Badge variant="outline" className="text-blue-600 text-xs md:text-sm">{singleJobs?.salary}</Badge>
                </div>

                <div>
                    {hasApplied ? (
                        <Button
                            disabled={hasApplied}
                            className="p-2 bg-gray-500 text-white font-semibold rounded cursor-not-allowed transition-all duration-300 ease-in-out"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-green-400">✔</span> Already Applied
                            </span>
                        </Button>
                    ) : (
                        <Button onClick={JobApplyHander}
                            className="p-2 bg-violet-600 text-white font-semibold rounded hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                        >
                            Apply Now
                        </Button>
                    )}
                </div>
            </div>

            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {singleJobs?.description}
                </motion.h2>
            </div>

            <hr className="my-4" />

            <div className="space-y-3">
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaBriefcase /> Role: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.position}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaMapMarkerAlt /> Location: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.location}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaDollarSign /> Salary: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.salary}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaCalendarAlt /> Post Date: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.createdAt?.split("T")[0]}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaCalendarAlt /> Experience Level: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.experienceLevel}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaUsers /> Total Applicants: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.applications?.length}</span>
                </p>
                <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaUsers /> Available Positions: <span className="font-normal text-gray-600 dark:text-gray-300">{singleJobs?.position}</span>
                </p>
            </div>
        </motion.div>
    );
};

export default JobApplyCard;

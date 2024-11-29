import React from 'react'
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const JobPagesCard = ({ jobs }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/jobs/${jobs?._id}`)} className="bg-white cursor-pointer dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{jobs?.company?.name}</h2>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{jobs?.title}</h2>
            <h3 className="text-[13px] text-gray-600 dark:text-gray-400 mb-4">{jobs?.location}</h3>
            <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-4">
                {jobs?.description}
            </p>
            <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="text-blue-600 border-blue-600 text-[8px] lg:text-[12px] md:text-[11px] hover:bg-blue-100 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-500">
                    {jobs?.jobType}
                </Badge>
                <Badge variant="outline" className="text-green-600 text-[8px] lg:text-[12px] md:text-[11px] border-green-600 hover:bg-green-100 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-500">
                    {jobs?.position}
                </Badge>
                <Badge variant="outline" className="text-purple-600 text-[8px] lg:text-[12px] md:text-[11px] border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-500">
                    {jobs?.salary}
                </Badge>
            </div>
        </div>
    )
}

export default JobPagesCard
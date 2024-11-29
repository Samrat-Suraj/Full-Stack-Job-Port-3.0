import { Contact2, LocateIcon, Mail, Pen } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import UpdateProfileDialog from './UpdateProfileDialog';
import useAllApplyedJobs from '@/hooks/useAllApplyedJobs';


const UserDetails = () => {
    useAllApplyedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    return (
        <div className="flex flex-col md:flex-row w-full max-w-4xl m-auto border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 p-6 mt-10 mb-14 relative">

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <img
                    className="h-24 w-24 rounded-full border-4 border-blue-500"
                    src={user?.profile?.profilePic ? user?.profile?.profilePic : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"}
                    alt="Profile"
                />

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{user?.fullname ? user?.fullname : "User Name"}</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{user?.profile?.bio ? user?.profile?.bio : "Your Bio"}</p>


                    <div className="flex flex-col gap-1 mt-3">
                        <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                            <Mail className="text-gray-500 dark:text-gray-300" />{user?.email ? user?.email : "abc@gmail.com"}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                            <Contact2 className="text-gray-500 dark:text-gray-300" />{user?.phoneNumber ? user?.phoneNumber : "+91 1234567890"}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                            <LocateIcon className="text-gray-500 dark:text-gray-300" />{user?.profile?.city ? user?.profile?.city : "location"}
                        </p>
                    </div>


                    <div className="mt-4">
                        <p className="font-semibold text-gray-900 dark:text-white">Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user?.profile?.skills?.length > 0 ? (
                                user?.profile?.skills?.map((item, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className={`text-xs sm:text-sm mt-2 
                      ${index % 3 === 0 ? 'bg-blue-500 text-white' : ''} 
                      ${index % 3 === 1 ? 'bg-green-500 text-white' : ''} 
                      ${index % 3 === 2 ? 'bg-purple-500 text-white' : ''}
                      hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white transition`}
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <Badge variant="outline" className="text-xs md:text-sm text-white bg-red-500 dark:bg-red-700 dark:text-white transition">Add Skills</Badge>
                            )}
                        </div>
                    </div>


                    <div className="mt-4">
                        <p className="font-semibold text-gray-900 dark:text-white">Resume</p>
                        <p className="text-gray-600 dark:text-gray-300">
                            <a href={user?.profile?.resume} className="text-blue-400 hover:underline" target="_blank">{user?.profile?.resumeOriginalName ? user?.profile?.resumeOriginalName : "Suraj.pdf"}</a>
                        </p>
                        <br />
                        <p className="font-semibold text-gray-900 dark:text-white">Date Of Birth</p>
                        <p className="text-gray-600 dark:text-gray-300">{user?.profile?.dob ? user?.profile?.dob : "10/06/2001"}</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Pen (Edit) Button */}
            <div className="absolute top-4 right-4 md:right-0 md:top-0">
                <Button onClick={() => setOpen(true)} variant="ghost" className="text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    <Pen />
                </Button>
            </div>

            <UpdateProfileDialog setOpen={setOpen} open={open} />

        </div>
    );
}

export default UserDetails;

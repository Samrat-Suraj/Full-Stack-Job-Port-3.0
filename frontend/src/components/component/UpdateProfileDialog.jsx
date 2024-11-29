import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const [profilePic , setProfilePic] = useState("")
    const [resume , setResume] = useState("")

    const [input , setInput] = useState({
        fullname : "",
        phoneNumber: "",
        bio: "",
        skills: "" ,
        dob: "",
        city: "",
    })

    const onProfilePicChangeHander = (e) =>{
        setProfilePic(e.target.files[0])
    }
    const onResumeChangeHander = (e) =>{
        setResume(e.target.files[0])
    }

    const onInputChangeHander = (e) =>{
        setInput({...input , [e.target.name] : e.target.value})
    }

    const onSubmitHander = async (e) =>{
        e.preventDefault()

        const form = new FormData()
        form.append("fullname" , input.fullname)
        form.append("phoneNumber" , input.phoneNumber)
        form.append("bio" , input.bio)
        form.append("skills" , input.skills)
        form.append("dob" , input.dob)
        form.append("city" , input.city)
        if(profilePic){
            form.append("profilePic" , profilePic)
        }
        if(resume){
            form.append("resume" , resume)
        }

        try {

            setLoading(true)
            const res = await axios.post("http://localhost:5000/api/user/profile/update" , form , {
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true
            })

            if(res.data.success){
                setOpen(false)
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div>
            
            <Dialog open={open}>
                <DialogContent
                    onInteractOutside={() => setOpen(false)}
                    className="w-[32vw] min-w-[330px] pt-3 pb-3 pl-4 pr-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                    <form onSubmit={onSubmitHander} className="h-full flex text-[12px] flex-col gap-2">

                        <div className="space-y-1">
                            <label htmlFor="fullname" className="block font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input 
                                type="text"
                                id="fullname"
                                name="fullname"
                                onChange={onInputChangeHander}
                                value={input.fullname}
                                placeholder="Enter your full name"
                                className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="phoneNumber" className="block font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={onInputChangeHander}
                                placeholder="Enter your phone number"
                                className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="bio" className="block font-medium text-gray-700 dark:text-gray-300">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={onInputChangeHander}
                                placeholder="Write a short bio"
                                className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="city" className="block font-medium text-gray-700 dark:text-gray-300">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={input.city}
                                onChange={onInputChangeHander}
                                placeholder="Enter your city"
                                className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="dob" className="block font-medium text-gray-700 dark:text-gray-300">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                onChange={onInputChangeHander}
                                value={input.dob}
                                name="dob"
                                className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>


                        <div className="space-y-1">
                            <label htmlFor="skills" className="block font-medium text-gray-700 dark:text-gray-300">
                                Skills
                            </label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={onInputChangeHander}
                                placeholder="Enter skills"
                                className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="flex gap-2">

                            <div className="space-y-1">
                                <label htmlFor="resume" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Resume URL
                                </label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept='.pdf'
                                    onChange={onResumeChangeHander}
                                    className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>


                            <div className="space-y-1">
                                <label htmlFor="profilePic" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Profile Picture URL
                                </label>
                                <input
                                    type="file"
                                    id="profilePic"
                                    name="profilePic"
                                    onChange={onProfilePicChangeHander}
                                    accept='image/*'
                                    placeholder="Enter your profile picture URL"
                                    className="w-full px-2 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                        >
                            {
                                loading ? <Loader2 className='h-4 w-4 animate-spin ' /> : <></>
                            }
                            Update
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog

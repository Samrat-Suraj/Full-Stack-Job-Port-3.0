import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const PostJobs = () => {
    const { companies } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        jobType: "",
        experienceLevel: "",
        position: "",
        companyId: ""
    })

    const onChangeHander = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const OnSubmitHander = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post("http://localhost:5000/api/job/postjob", input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/admin/jobs")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='app m-auto mt-6'>
            <NavBar />
            <h1 className="text-3xl mt-4 font-bold text-center">
                <span className='text-blue-600 dark:text-blue-400'>P</span>ost <span className='text-red-600 dark:text-red-400'>J</span>ob
            </h1>
            {
                companies.length === 0 && <p className='text-red-500 dark:text-red-400 text-center font-bold mt-2'> * Please Register a company before Posting A Job *</p>
            }
            <div className="flex flex-col md:flex-row w-[90%] md:w-[80%] m-auto justify-center py-6 space-y-8 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-[90%] p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <form onSubmit={OnSubmitHander}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Job Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={input.title}
                                onChange={onChangeHander}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter job title"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={input.description}
                                rows="4"
                                onChange={onChangeHander}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter job description"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Requirements</label>
                            <input
                                type="text"
                                id="requirements"
                                value={input.requirements}
                                onChange={onChangeHander}
                                name="requirements"
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter requirements (comma-separated)"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={input.location}
                                onChange={onChangeHander}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter job location"
                                required
                            />
                        </div>

                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className="mb-4 w-full">
                                <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Salary</label>
                                <input
                                    type="text"
                                    value={input.salary}
                                    onChange={onChangeHander}
                                    id="salary"
                                    name="salary"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter salary range"
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label htmlFor="position" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Position</label>
                                <input
                                    type="number"
                                    value={input.position}
                                    id="position"
                                    name="position"
                                    onChange={onChangeHander}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter position"
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className="mb-4 w-full">
                                <label htmlFor="jobType" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Job Type</label>
                                <select
                                    id="jobType"
                                    value={input.jobType}
                                    name="jobType"
                                    onChange={onChangeHander}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select A Job Type</option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="temporary">Temporary</option>
                                    <option value="intern">Intern</option>
                                </select>
                            </div>

                            <div className="mb-4 w-full">
                                <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Experience Level</label>
                                <input
                                    type="text"
                                    id="experienceLevel"
                                    name="experienceLevel"
                                    value={input.experienceLevel}
                                    onChange={onChangeHander}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Enter experience level"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Company</label>
                            <select
                                id="companyId"
                                name="companyId"
                                value={input.companyId}
                                onChange={onChangeHander}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            >
                                <option value="">Select A Company</option>
                                {
                                    companies?.map((company, index) => {
                                        return (
                                            <option key={index} value={company?._id}>{company?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-4 flex  justify-center gap-3 items-center bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            >{
                                    loading ? <Loader2 className='h-5 w-5 animate-spin ' /> : <></>
                                }
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PostJobs

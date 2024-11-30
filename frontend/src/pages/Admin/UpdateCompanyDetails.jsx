import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { toast } from 'sonner'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { useSelector } from 'react-redux'

const UpdateCompanyDetails = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const { singleCompany } = useSelector(store => store.company)
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: ""
    })

    useEffect(() => {
        if (singleCompany && singleCompany.name) {
            setInput({
                name: singleCompany.name,
                description: singleCompany.description,
                location: singleCompany.location,
                website: singleCompany.website
            });
        }
    }, [singleCompany]);


    const onChangeHander = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const UpdateCompanyHander = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("name", input.name)
        form.append("description", input.description)
        form.append("location", input.location)
        form.append("website", input.website)
        if (image) {
            form.append("logo", image)
        }

        try {
            setLoading(true)
            const res = await axios.put(`https://job-port-dryp.onrender.com/api/company/update/${params.id}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate(`/admin/companies`)
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='app m-auto dark:bg-black'>
            <NavBar />
            <div className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] mx-auto mt-14 mb-14">
                <div className="flex justify-between items-center mb-8">
                    <Button
                        className="flex items-center gap-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                        onClick={() => navigate("/admin/companies")}
                        variant="outline"
                    >
                        <ArrowLeft width={16} />
                        <p>Back</p>
                    </Button>
                    <h1 className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] font-bold text-gray-900 dark:text-white">Company Setup</h1>
                </div>

                <form onSubmit={UpdateCompanyHander} className="flex gap-4 flex-col mt-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl transition-all duration-300">
                    {/* Logo Section */}
                    <div className="mb-6">
                        <h2 className="text-gray-600 dark:text-gray-300 font-bold text-lg mb-3">
                            <span className='text-2xl text-blue-400'>L</span>ogo Of Your Company
                        </h2>
                        <label htmlFor="logo" className="cursor-pointer transition-transform transform hover:scale-105">
                            {
                                image
                                    ? <img className='h-24 w-24 rounded-lg shadow-md transition-all duration-300' src={URL.createObjectURL(image)} alt="Company Logo" />
                                    : <img className="h-24 w-24 object-contain border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300" src="/camera.png" alt="Upload Logo" />
                            }
                        </label>
                        <input
                            type="file"
                            name="logo"
                            id="logo"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    {/* Company Name */}
                    <div className="flex gap-2 flex-col mb-6">
                        <label className="text-gray-600 dark:text-gray-300 font-semibold text-[14px]" htmlFor="company">Company Name</label>
                        <Input
                            placeholder="Enter Company Name"
                            name="name"
                            id="company"
                            value={input.name}
                            onChange={onChangeHander}
                            className="focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 border-gray-300 p-3 rounded-lg shadow-sm transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex gap-2 flex-col mb-6">
                        <label className="text-gray-600 dark:text-gray-300 font-semibold text-[14px]" htmlFor="description">Description</label>
                        <Textarea
                            placeholder="Write a description"
                            name="description"
                            id="description"
                            value={input.description}
                            onChange={onChangeHander}
                            className="focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 border-gray-300 p-3 rounded-lg shadow-sm transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500"
                        />
                    </div>

                    {/* Location and Website */}
                    <div className="flex gap-4 mb-6">
                        <div className="w-full sm:w-[48%] flex gap-2 flex-col">
                            <label className="text-gray-600 dark:text-gray-300 font-semibold text-[14px]" htmlFor="location">Location</label>
                            <Input
                                placeholder="Enter Location"
                                name="location"
                                value={input.location}
                                onChange={onChangeHander}
                                id="location"
                                className="focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 border-gray-300 p-3 rounded-lg shadow-sm transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500"
                            />
                        </div>
                        <div className="w-full sm:w-[48%] flex gap-2 flex-col">
                            <label className="text-gray-600 dark:text-gray-300 font-semibold text-[14px]" htmlFor="website">Website</label>
                            <Input
                                placeholder="Website URL"
                                name="website"
                                id="website"
                                value={input.website}
                                onChange={onChangeHander}
                                className="focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-gray-50 border-gray-300 p-3 rounded-lg shadow-sm transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                        loading
                            ? <Button type="submit" className="mt-6 mb-6 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:ring-2 focus:ring-indigo-500 flex items-center justify-center transition-all duration-300">
                                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Updating...
                            </Button>
                            : <Button type="submit" className="mt-6 mb-6 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300">
                                Update Details
                            </Button>
                    }
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default UpdateCompanyDetails

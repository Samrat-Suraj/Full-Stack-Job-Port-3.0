import NavBar from '@/components/component/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const RegisterCompany = () => {
    const navigate = useNavigate()
    const [input , setInput] = useState({
        name : ""
    })
    const onChangeHander = (e) =>{
        const text = e.target.value
        setInput({...input , [e.target.name] : text})
    }
    const OnClickHander = async () =>{
        try {
            const res = await axios.post("https://job-port-dryp.onrender.com/api/company/register" , input , {
                withCredentials : true
            })
            if(res?.data?.success){
                const id = res?.data?.company?._id
                navigate(`/admin/companies/${id}/update`)
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="app m-auto bg-white dark:bg-black">
            <NavBar />
            <div className="flex flex-col mt-12">
                <div className="w-full max-w-4xl mx-auto px-6 py-8 sm:px-8 lg:px-10">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Company Name Register</h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">Enter the name of your company. You can always update it later.</p>

                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Company Name</h2>
                        <Input 
                            name="name" 
                            onChange={onChangeHander}
                            value={input.name}
                            className="w-full mb-6 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-50 border-gray-300 rounded-lg shadow-sm"
                            placeholder="Enter your company name"
                        />

                        <div className="flex space-x-6 justify-center">
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-transparent border-2 border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                Cancel
                            </Button>
                            <Button  onClick={OnClickHander}
                                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-indigo-600 dark:bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterCompany

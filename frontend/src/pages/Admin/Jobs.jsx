import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobQuery } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'

const Jobs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useGetAllAdminJobs()
    const [input , setInput] = useState("")
    const onChangeHander = (e) =>{
        setInput(e.target.value)
    }
    useEffect(()=>{
        dispatch(setSearchJobQuery(input))
    },[input])

    return (
        <div className='app m-auto'>
            <NavBar />
            <div className='mt-20 mb-11 w-[80%] m-auto'>
                <div className='flex justify-between items-center'>
                    <Input
                        placeholder="Search Name , role , Date "
                        onChange={onChangeHander}
                        className="w-full sm:w-[30%] md:w-[20%] focus-visible:ring-transparent "
                    />
                    <Button onClick={() => navigate("/admin/jobs/post")}>Post Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
            <Footer />
        </div>
    )
}

export default Jobs
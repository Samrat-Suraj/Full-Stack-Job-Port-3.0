import Footer from '@/components/component/Footer'
import JobPagesCard from '@/components/component/JobPagesCard'
import NavBar from '@/components/component/NavBar'
import SideBarFilter from '@/components/component/SideBarFilter'
import { setGlobeSearchJobQuery } from '@/redux/jobSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const JobsPage = () => {
    
    const { allJobs, searchJobQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        const search = allJobs.filter((jobs) => {
            if (!searchJobQuery) {
                return true
            } else {
                return jobs?.title?.toLowerCase().includes(searchJobQuery?.toLowerCase()) ||
                    jobs?.location?.toLowerCase().includes(searchJobQuery?.toLowerCase()) ||
                    jobs?.salary?.toLowerCase().includes(searchJobQuery?.toLowerCase())
            }
        })
        setFilterJobs(search)
    }, [allJobs, searchJobQuery])


    return (
        <div className='app m-auto' >
            <NavBar />
            <h1 className='mt-10 text-2xl font-bold mb-2' >Filter Jobs</h1>
            <div className='flex mb-16 gap-2 h-[88vh]' >
                <SideBarFilter />
                <div className='flex flex-col w-full gap-3 overflow-scroll scrollhide' >
                    {
                        filterJobs?.map((jobs) => {
                            return (
                                <JobPagesCard key={jobs?._id} jobs={jobs} />
                            )
                        })
                    }
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default JobsPage
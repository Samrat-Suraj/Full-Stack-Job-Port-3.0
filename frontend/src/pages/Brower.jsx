import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import SearchResult from '@/components/component/SearchResult'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setGlobeSearchJobQuery } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Brower = () => {

  useGetAllJobs()
  const {allJobs} = useSelector(store => store.job)

  const dispatch = useDispatch()
  useEffect(()=>{
      return () =>{
          dispatch(setGlobeSearchJobQuery(""))
      }
  },[])

  return (
    <div className='app m-auto'>
      <NavBar />
      <div className='grid mt-8 mb-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ' >
        {
          allJobs?.map((job) => {
            return (
              <SearchResult key={job._id} job={job} />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}

export default Brower
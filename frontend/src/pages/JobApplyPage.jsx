import Footer from '@/components/component/Footer'
import JobApplyCard from '@/components/component/JobApplyCard'
import NavBar from '@/components/component/NavBar'
import React from 'react'

const JobApplyPage = () => {
  return (
    <div className='app m-auto' >
        <NavBar/>
        <JobApplyCard/>
        <Footer/>
    </div>
  )
}

export default JobApplyPage
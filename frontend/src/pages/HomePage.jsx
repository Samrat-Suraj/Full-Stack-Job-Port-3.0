import Footer from '@/components/component/Footer'
import Hero from '@/components/component/Hero'
import HomePageJob from '@/components/component/HomePageJob'
import NavBar from '@/components/component/NavBar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role === "admin"){
      navigate("/admin/companies")
    }
  },[])
  
  useGetAllJobs()

  return (
    <div className='app m-auto' >
        <NavBar/>
        <Hero/>
        <HomePageJob/>
        <Footer/>
    </div>
  )
}

export default HomePage
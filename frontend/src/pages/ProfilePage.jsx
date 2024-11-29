import ApplyedJobTable from '@/components/component/ApplyedJobTable'
import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import UserDetails from '@/components/component/UserDetails'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className='app m-auto' >
        <NavBar/>
        <UserDetails/>
        <ApplyedJobTable/>
        <Footer/>
    </div>
  )
}

export default ProfilePage
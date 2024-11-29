import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import { useSelector } from 'react-redux'

const Application = () => {
  const {allApplicant} = useSelector(store => store.applicaation)
  return (
    <div className='app m-auto' >
        <NavBar/>
        <h1 className='font-bold text-xl mt-10' >Applicants ({allApplicant?.applications?.length})</h1>
        <ApplicantsTable/>
        <Footer/>
    </div>

  )
}

export default Application
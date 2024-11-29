import Footer from '@/components/component/Footer'
import NavBar from '@/components/component/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyQuery } from '@/redux/CompanySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminCompaniesTable from './AdminCompaniesTable'

const Companies = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [input , setInput]= useState("")
    useGetAllCompanies()
    
    const onChangeSearch = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        dispatch(setSearchCompanyQuery(input))
    },[input])


    return (
        <div className='app m-auto'>
            <NavBar />
            <div className='mt-20 mb-11 w-[80%] m-auto'>
                <div className='flex justify-between items-center'>
                    <Input
                        placeholder="Search By Name"
                        onChange={onChangeSearch}
                        className="w-full sm:w-[30%] md:w-[20%] focus-visible:ring-transparent "
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <AdminCompaniesTable />
            </div>
            <Footer />
        </div>
    )
}

export default Companies

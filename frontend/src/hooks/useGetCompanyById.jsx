import { setSingleCompany } from '@/redux/CompanySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getSingleCompany = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/company/getcompany/${companyId}` , {withCredentials : true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }

            } catch (error) {
                console.log(error)
            }
        }
        getSingleCompany()
    },[dispatch , companyId])
}

export default useGetCompanyById
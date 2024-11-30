import { setAllCampanies } from '@/redux/CompanySlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const featchAllCompany = async () =>{
            try {
                const res = await axios.get("https://job-port-dryp.onrender.com/api/company/getcompany" , {withCredentials : true})
                if(res.data.success){
                    dispatch(setAllCampanies(res?.data?.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        featchAllCompany()
    },[dispatch])
}

export default useGetAllCompanies
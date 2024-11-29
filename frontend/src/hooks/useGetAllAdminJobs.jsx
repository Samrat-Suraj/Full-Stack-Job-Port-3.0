import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const featchAllJobs = async () =>{
            try {
                const res = await axios.get("http://localhost:5000/api/job/getadminjobs" , {withCredentials : true})
                if(res.data.success){
                    dispatch(setAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        featchAllJobs()
    },[dispatch])
}

export default useGetAllAdminJobs
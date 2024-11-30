import { setSingleJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetJobById = (jobId) => {
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const featchGetJobById = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/job/${jobId}` , {withCredentials : true})
                if(res.data.success){
                    dispatch(setSingleJobs(res?.data?.job))
                }
            } catch (error) {
                console.log(error)
            }
        }
        featchGetJobById()
    },[dispatch , jobId , user._id])

}

export default useGetJobById
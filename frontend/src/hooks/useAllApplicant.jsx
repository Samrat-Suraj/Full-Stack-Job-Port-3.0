import { setAllApplicant } from '@/redux/applicaationSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useAllApplicant = (jobId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fatchAplicantsData  = async () =>{
            try {
                const res = await axios.get(`https://full-stack-job-port-3-0.onrender.com/api/application/${jobId}/applicants` , {withCredentials : true})
                if(res.data.success){
                    dispatch(setAllApplicant(res.data.job))
                }

            } catch (error) {
                console.log(error)
            }
        }
        fatchAplicantsData ()
    },[dispatch , jobId])
}

export default useAllApplicant
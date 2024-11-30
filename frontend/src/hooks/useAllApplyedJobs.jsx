import { setUserAppliedJobs } from '@/redux/applicaationSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useAllApplyedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get("https://job-port-dryp.onrender.com/api/application/get", { withCredentials: true })
                if (res.data.success) {
                    dispatch(setUserAppliedJobs(res?.data?.applications))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs()
    }, [dispatch])
}

export default useAllApplyedJobs
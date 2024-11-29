import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { globeSearchJobQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/job/all?keyword=${globeSearchJobQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchAllJobs();
    }, [globeSearchJobQuery, dispatch]);
};

export default useGetAllJobs;
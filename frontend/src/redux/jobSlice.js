import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name  : "jobs",
    initialState : {
        adminJobs : [],
        singleJobs : '',
        searchJobQuery : "",
        allJobs : [],
        globeSearchJobQuery : ""
    },
    reducers : {
        setAdminJobs : (state , action) =>{
            state.adminJobs = action.payload
        },
        setSingleJobs : (state , action) =>{
            state.singleJobs = action.payload
        },
        setSearchJobQuery : (state , action) =>{
            state.searchJobQuery = action.payload
        },
        setAllJobs : (state , action) =>{
            state.allJobs = action.payload
        },
        setGlobeSearchJobQuery :(state , action) =>{
            state.globeSearchJobQuery = action.payload
        }
    }
})

export const {setAdminJobs , setSingleJobs , setSearchJobQuery , setAllJobs , setGlobeSearchJobQuery} = jobSlice.actions
export default jobSlice.reducer
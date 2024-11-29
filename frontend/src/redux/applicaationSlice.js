import { createSlice } from "@reduxjs/toolkit";


const applicaationSlice = createSlice({
    name : "application",
    initialState : {
        userAppliedJobs : [],
        allApplicant : []
    },
    reducers:{
        setUserAppliedJobs : (state , action)=>{
            state.userAppliedJobs = action.payload
        },
        setAllApplicant : (state , action)=>{
            state.allApplicant = action.payload
        },
    }   
})

export const {setUserAppliedJobs , setAllApplicant} = applicaationSlice.actions
export default applicaationSlice.reducer
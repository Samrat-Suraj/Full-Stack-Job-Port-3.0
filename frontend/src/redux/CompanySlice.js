import { createSlice } from "@reduxjs/toolkit";

const CompanySlice = createSlice({
    name : "company",
    initialState : {
        companies : [],
        singleCompany : "",
        searchCompanyQuery : ""
    },
    reducers:{
        setAllCampanies : (state , action) =>{
            state.companies = action.payload
        },
        setSingleCompany : (state , action) =>{
            state.singleCompany = action.payload
        },
        setSearchCompanyQuery : (state , action) =>{
            state.searchCompanyQuery = action.payload
        }
    }
})

export const {setAllCampanies , setSingleCompany ,setSearchCompanyQuery} = CompanySlice.actions
export default CompanySlice.reducer
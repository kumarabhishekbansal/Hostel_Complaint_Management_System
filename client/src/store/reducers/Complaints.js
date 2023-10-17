import { createSlice } from "@reduxjs/toolkit";

const initialState={
    complaintsInfo:JSON.parse(localStorage.getItem("complaints")) || []
}

const complaintSlice=createSlice({
    name:"complaints",
    initialState:initialState,
    reducers:{
        setcomplaintsInfo:(state,action)=>{
            state.complaintsInfo=action.payload
        },
        resetcomplaintsInfo:(state)=>{
            state.complaintsInfo=null
        }
    }
})

const ComplaintActions=complaintSlice.actions;
const ComplaintReducer=complaintSlice.reducer;

export  {ComplaintActions,ComplaintReducer};


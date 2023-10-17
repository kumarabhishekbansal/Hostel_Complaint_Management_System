import { createSlice } from "@reduxjs/toolkit";

const initialState={
    hostelsInfo:JSON.parse(localStorage.getItem("hostels")) || []
}

const HostelSlice=createSlice({
    name:"hostels",
    initialState:initialState,
    reducers:{
        setHostelsInfo:(state,action)=>{
            state.hostelsInfo=action.payload
        },
        resetHostelsInfo:(state)=>{
            state.hostelsInfo=null
        }
    }
})

const HostelActions=HostelSlice.actions;
const HostelReducer=HostelSlice.reducer;

export  {HostelActions,HostelReducer};


import { createSlice } from "@reduxjs/toolkit";

const initialState={
    studentsInfo:JSON.parse(localStorage.getItem("students")) || []
}

const StudentsSlice=createSlice({
    name:"allstudents",
    initialState:initialState,
    reducers:{
        setstudentsInfo:(state,action)=>{
            state.studentsInfo=action.payload
        },
        resetstudentsInfo:(state)=>{
            state.studentsInfo=null
        }
    }
})

const StudentActions=StudentsSlice.actions;
const StudentReducer=StudentsSlice.reducer;

export  {StudentActions,StudentReducer};


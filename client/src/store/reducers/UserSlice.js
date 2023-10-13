import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:JSON.parse(localStorage.getItem('hcmaccount')) || null
}

const userSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userInfo=action.payload
        },
        resetUserInfo:(state)=>{
            state.userInfo=null
        }
    }
})

const userActions=userSlice.actions;
const userReducer=userSlice.reducer;
export {userActions,userReducer};
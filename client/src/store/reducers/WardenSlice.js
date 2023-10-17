import { createSlice } from "@reduxjs/toolkit";

const initialState={
    wardensInfo:JSON.parse(localStorage.getItem("wardens")) || []
};

const WardenSlice=createSlice({
    name:"wardens",
    initialState:initialState,
    reducers:{
        setWardensInfo:(state,actions)=>{
            state.wardensInfo=actions.payload
        },
        resetWardensInfo:(state,actions)=>{
            state.wardensInfo=[]
        }
    }
})

const WardenActions=WardenSlice.actions;
const WardenReducer=WardenSlice.reducer;

export {WardenActions,WardenReducer};

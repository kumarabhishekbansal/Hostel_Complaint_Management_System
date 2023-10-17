import { createSlice } from "@reduxjs/toolkit";

const initialsState={
    RoomInfo:JSON.parse(localStorage.getItem("rooms")) || []
}

const RoomSlice=createSlice({
    name:"rooms",
    initialState:initialsState,
    reducers:{
        setRoomInfo:(state,action)=>{
            state.RoomInfo=action.payload
        },
        resetRoomInfo:(state)=>{
            state.RoomInfo=[];
        }
    }
})


const RoomActions=RoomSlice.actions;
const RoomReducer=RoomSlice.reducer;

export {RoomActions,RoomReducer};

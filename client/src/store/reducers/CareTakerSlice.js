import { createSlice } from "@reduxjs/toolkit";

const initialState={
    caretakersInfo:JSON.parse(localStorage.getItem("caretakers")) || []
};

const CareTakerSlice=createSlice({
    name:"caretakers",
    initialState:initialState,
    reducers:{
        setCareTakerInfo:(state,actions)=>{
            state.caretakersInfo=actions.payload
        },
        resetCareTakerInfo:(state,actions)=>{
            state.caretakersInfo=[]
        }
    }
})

const CareTakerActions=CareTakerSlice.actions;
const CareTakerReducer=CareTakerSlice.reducer;

export {CareTakerActions,CareTakerReducer};

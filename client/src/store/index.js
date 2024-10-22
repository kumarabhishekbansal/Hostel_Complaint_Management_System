import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/UserSlice";
import {HostelReducer} from "./reducers/HostelSlice"
import { WardenReducer } from "./reducers/WardenSlice";
import { CareTakerReducer } from "./reducers/CareTakerSlice";
import { StudentReducer } from "./reducers/StudentsSlice";
import { RoomReducer } from "./reducers/RoomSlice";
import { ComplaintReducer } from "./reducers/Complaints";
const store=configureStore({
    reducer:{
        user:userReducer,
        hostels:HostelReducer,
        wardens:WardenReducer,
        caretakers:CareTakerReducer,
        allstudents:StudentReducer,
        rooms:RoomReducer,
        complaints:ComplaintReducer
    }
})

export default store;


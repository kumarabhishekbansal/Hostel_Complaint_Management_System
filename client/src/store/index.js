import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/UserSlice";
const userInfoFromStorage = localStorage.getItem("hcmccount")
  ? JSON.parse(localStorage.getItem("hcmaccount"))
  : null;
const store=configureStore({
    reducer:{
        user:userReducer
    }
})

export default store;


import {userActions} from "../reducers/UserSlice.js";

export const logout=(dispatch)=>{
    dispatch(userActions.resetUserInfo);
    localStorage.removeItem("hcmaccount");
}

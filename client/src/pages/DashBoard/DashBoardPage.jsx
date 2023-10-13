import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import OfficerDashBoard from './Officer/OfficerDashBoard';
import Dash from '../NotAuthorized/Dash';
import WardenDashBoard from './warden/WardenDashBoard';
import CareTakerDashBoard from './careTaker/CareTaker';
import StudentDashBoard from './Student/StudentDashBoard';
const DashBoardPage = () => {
    const userstate=useSelector((state)=>state.user);
    // console.log("userstate : ",userstate.userInfo);
    const [children, setchildren] = useState(<Dash />);
    useEffect(()=>{
        if(userstate==null || userstate.userInfo==null)
        {
            setchildren(<Dash />);
        }else if(userstate.userInfo?.role==="Officer")
        {
            setchildren(<OfficerDashBoard header={userstate.userInfo?.name} profile_pic={userstate.userInfo?.profilePic}/>)
        }else if(userstate.userInfo?.role==="warden")
        {
            setchildren(<WardenDashBoard header={userstate.userInfo?.name} profile_pic={userstate.userInfo?.profilePic}/>)
        }else if(userstate.userInfo?.role==="caretaker")
        {
            setchildren(<CareTakerDashBoard header={userstate.userInfo?.name} profile_pic={userstate.userInfo?.profilePic}/>)
        }
        else if(userstate.userInfo?.role==="student")
        {
            setchildren(<StudentDashBoard header={userstate.userInfo?.name} profile_pic={userstate.userInfo?.profilePic}/>)
        }else{
            setchildren(<Dash />);
        }
    },[userstate])
  return (
    <div>
        {children}
    </div>
  )
}

export default DashBoardPage
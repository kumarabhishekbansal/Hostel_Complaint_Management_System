import React,{useEffect, useState} from 'react'
import Dash from '../NotAuthorized/Dash'
import { useSelector } from 'react-redux'
import OfficerProfile from "./officer/OfficerProfile"
import WardenProfile from './warden/WardenProfile'
import CareTakerProfile from './caretaker/CareTakerProfile'
import StudentProfile from './student/StudentProfile'
const ProfilePage = () => {
  const [children,setchildren]=useState(<Dash />)
  const userstate=useSelector((state)=>state.user);
  useEffect(()=>{
    if(userstate && userstate?.userInfo?.role==="Officer")
    {
      setchildren(<OfficerProfile />)
    }else if(userstate && userstate?.userInfo?.role==="warden")
    {
      setchildren(<WardenProfile />)
    }else if(userstate && userstate?.userInfo?.role==="caretaker")
    {
      setchildren(<CareTakerProfile />)
    }else if(userstate && userstate?.userInfo?.role==="student")
    {
      setchildren(<StudentProfile />)
    }else{
      setchildren(<Dash />)
    }
  },[userstate]);
  return (
    
    <section className='mx-auto container bg-slate-300'>
        {children}
    </section>
  )
}

export default ProfilePage
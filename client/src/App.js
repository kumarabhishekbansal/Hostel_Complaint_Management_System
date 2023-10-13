import React, { Component } from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import { Toaster } from 'react-hot-toast';
import ContactUs from './pages/Contact/ContactUsPage';
import Dash from './pages/NotAuthorized/Dash';
import DashBoardPage from './pages/DashBoard/DashBoardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import {Auth,Authorized} from './middlewares/Auth';
const App = () => {
  return (
   <>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<ContactUs />} />
      <Route exact path="/dash" element={<Authorized Component={Dash}/>} />
      <Route exact path="/dashboard" element={<Auth Component={DashBoardPage} />} />
      <Route exact path="/profile" element={<Auth Component={ProfilePage} />} />
    </Routes>
    <Toaster />
   </>
  )
}

export default App
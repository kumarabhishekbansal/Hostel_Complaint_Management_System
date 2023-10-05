import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import { Toaster } from 'react-hot-toast';
import ContactUs from './pages/Contact/ContactUsPage';
import Dash from './pages/NotAuthorized/Dash';
import DashBoardPage from './pages/DashBoard/Officer/OfficerDashBoard';
const App = () => {
  return (
   <>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<ContactUs />} />
      <Route exact path="/dash" element={<Dash />} />
      <Route exact path="/dashboard" element={<DashBoardPage />} />
    </Routes>
    <Toaster />
   </>
  )
}

export default App
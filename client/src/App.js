import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import { Toaster } from 'react-hot-toast';
import ContactUs from './pages/Contact/ContactUsPage';
import Dash from './pages/NotAuthorized/Dash';
import DashBoardPage from './pages/DashBoard/DashBoardPage';
import ProfilePage from './pages/Profile/ProfilePage';
import {Auth,Authorized,OfficeGaurd,WardenGaurd,StudentGaurd,CareTakerGaurd} from './middlewares/Auth';
import AddWarden from './pages/officer/AddWarden';
import NotFound from './pages/NotAuthorized/NotFound';
import AddHostels from './pages/officer/AddHostels';
import AddCareTakers from './pages/officer/AddCareTakers';
import ShowAllStudents from './pages/officer/ShowAllStudents';
import AddStudents from './pages/warden/AddStudents';
import ShowStudents from './pages/warden/ShowStudents';
import CreateIssue from './pages/student/CreateIssue';
import GetComplaints from './pages/student/GetComplaints';
import GetComplaintsWarden from './pages/warden/GetComplaintsWarden';
import GetComplaintsCareTaker from './pages/caretaker/GetComplaintCareTaker';
import LatestAnnouncement from './pages/common/LatestAnnouncement';
import ShowCareTakers from './pages/warden/ShowCareTakers';
const App = () => {
  return (
   <>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route index path="/notfound" element={<NotFound />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<ContactUs />} />
      <Route exact path="/dash" element={<Authorized Component={Dash}/>} />
      <Route exact path="/dashboard" element={<Auth Component={DashBoardPage} />} />
      <Route exact path="/profile" element={<Auth Component={ProfilePage} />} />
      <Route exact path="/add-warden" element={<OfficeGaurd Component={AddWarden} />} />
      <Route exact path="/add-hostels" element={<OfficeGaurd Component={AddHostels} />} />
      <Route exact path="/add-caretaker" element={<OfficeGaurd Component={AddCareTakers} />} />
      <Route exact path="/show-students" element={<OfficeGaurd Component={ShowAllStudents} />} />
      <Route exact path="/add-students" element={<WardenGaurd Component={AddStudents} />} />
      <Route exact path="/show-students-warden" element={<WardenGaurd Component={ShowStudents} />} />
      <Route exact path="/create-issue" element={<StudentGaurd Component={CreateIssue} />} />
      <Route exact path="/get-complaint-student" element={<StudentGaurd Component={GetComplaints} />} />
      <Route exact path="/get-complaint-warden" element={<WardenGaurd Component={GetComplaintsWarden} />} />
      <Route exact path="/show-caretaker-warden" element={<WardenGaurd Component={ShowCareTakers} />} />
      <Route exact path="/get-complaint-caretaker" element={<CareTakerGaurd Component={GetComplaintsCareTaker} />} />
      <Route exact path="/GetLatestAnnouncements" element={<LatestAnnouncement/>} />
    </Routes>
    <Toaster />
   </>
  )
}

export default App
import React from "react";
import TopNavBar from "../../../components/OverNavBar/TopNavBar";
const DashBoard = ({ header, profile_pic }) => {
  return (
    <section className=" mx-auto h-screen   bg-dark-hard">
      <TopNavBar />
      <div className="text-center  w-1/2  lg:w-1/5   rounded-full  m-auto">
        <img
          src={profile_pic}
          alt="Profile"
          className="object-cover w-full h-80  rounded-full"
        />
        <div className="text-4xl text-center mt-10 text-slate-400">
          <h1>Welcome, {header}</h1>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;

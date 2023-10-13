import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../constants";
const DashBoard = ({ header, profile_pic }) => {
  return (
    <section className=" mx-auto h-screen   bg-dark-hard">
      <div className="bg-dark-hard flex flex-col">
        <div className="flex justify-between gap-x-9">
          <div>
            <Link to="/">
              <img
                className="w-40 md:w-20"
                src={images?.Logo}
                alt="logo"
                width={98}
              />
            </Link>
          </div>
          <div>
            <ul className="flex gap-x-9 p-4">
              <li className="text-3xl text-slate-600 border-4 border-slate-900 p-2 rounded-full bg-sky-300">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="text-3xl text-slate-600 border-4 border-slate-900 p-2 rounded-full bg-sky-300">
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
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

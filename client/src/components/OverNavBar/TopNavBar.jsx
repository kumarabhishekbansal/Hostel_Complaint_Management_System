import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants";
const TopNavBar = () => {
  return (
    <>
      <div className="bg-dark-hard flex flex-col w-full">
        <div className="flex justify-between gap-x-9 w-full">
          <div>
            <Link to="/">
              <img
                className="w-20 md:w-20 bg-white rounded-full"
                src={images?.Logo}
                alt="logo"
                
              />
            </Link>
          </div>
          <div>
            <ul className="flex gap-x-9 p-4">
              <li className="text-xl md:text-2xl lg:text-3xl text-slate-600 border-4 border-slate-900 p-2 rounded-full bg-sky-300">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="text-xl md:text-2xl lg:text-3xl text-slate-600 border-4 border-slate-900 p-2 rounded-full bg-sky-300">
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;

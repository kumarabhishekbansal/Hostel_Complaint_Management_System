import React from "react";
import ChangeWriter from "../../../components/TypeWriter/ChangeWriter"
import { images } from "../../../constants";
const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
      <ChangeWriter texts={["Hostel Issue Tracker ","Student Grievance System","Lodging Issue Resolution","Campus Residence Help Desk","Hostel Improvement Portal"]}/> 
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
        This name suggests a more comprehensive approach to gathering feedback, not limited to complaints.
        Focuses on tracking and managing various issues within the hostel.
        Implies a proactive approach to solving problems within the dormitory.
        </p>
        {/* <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 y-6 text-[#959EAD]" />
            <input
              type="text"
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none md:py-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
              placeholder="Search Articles"
            />
          </div>

          <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
            Search
          </button>
        </div> */}

        <div className="flex flex-col mt-4 lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags :
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Hostel Management
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Complaint System
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Student Services
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Issue Resolution
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Transparency
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Data Management
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Campus Living
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Problem Solving
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
            Efficient Service
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <img
          src={images.HeroImage}
          className="w-full"
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;

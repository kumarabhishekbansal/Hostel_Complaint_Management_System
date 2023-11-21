import React from "react";
import DashBoard from "../Container/DashBoard";
import DashBoardCards from "../../../components/cards/DashBoardCards";
import { images } from "../../../constants";
import BorderLine from "../../../helper/BorderLine";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GrAddCircle, GrContact } from "react-icons/gr";
import { BiSolidShow } from "react-icons/bi";
import { GiEyeTarget } from "react-icons/gi";
import { FaReadme } from "react-icons/fa";
import { BsBuildingAdd, BsPenFill } from "react-icons/bs";
import { PiReadCvLogoFill, PiStudentBold } from "react-icons/pi";
const StudentDashBoard = ({ header, profile_pic }) => {
  return (
    <section className=" mx-auto">
      <DashBoard header={header} profile_pic={profile_pic} />
      <div className="h-screen bg-slate-800">
        <BorderLine header={"Your Services"} />
        <div className="flex flex-col md:flex-row bg-slate-800 mt-10 gap-10 justify-center items-center flex-wrap mb-4">
          <DashBoardCards
            image={images.complaints}
            alt={"complaints"}
            content={"Get All Complaints"}
            link={"/get-complaint-student"}
            linkcontent={"show"}
            icon=<BiSolidShow />
          />
          {/* mess menu feedback will be shown in this card */}
          <DashBoardCards
            image={images.mess_menu}
            alt={"mess menu"}
            content={"Show mess menu"}
            link={"/"}
            linkcontent={"Show"}
            icon=<GiEyeTarget />
          />

          <DashBoardCards
            image={images.latest_news}
            alt={"latest announcements"}
            content={"Latest Announcements"}
            link={"/GetLatestAnnouncements"}
            linkcontent={"Read"}
            icon=<FaReadme />
          />

          <DashBoardCards
            image={images.complaints}
            alt={"Create an issue"}
            content={"Create an issue"}
            link={"/create-issue"}
            linkcontent={"Create"}
            icon=<BsPenFill />
          />

          <DashBoardCards
            image={images.students}
            alt={"Show all complaints respective to room"}
            content={"Show all complaints respective to room"}
            link={"/"}
            linkcontent={"show"}
            icon=<PiReadCvLogoFill />
          />

          <DashBoardCards
            image={images.bgcontact_2}
            alt={"contact us"}
            content={"Contact Us"}
            link={"/contact"}
            linkcontent={"contact"}
            icon=<GrContact />
          />
        </div>
      </div>
    </section>
  );
};

export default StudentDashBoard;

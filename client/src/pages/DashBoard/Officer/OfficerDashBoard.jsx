import React from "react";
import DashBoard from "../Container/DashBoard";
import DashBoardCards from "../../../components/cards/DashBoardCards";
import { images } from "../../../constants";
import BorderLine from "../../../helper/BorderLine";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {GrAddCircle} from "react-icons/gr"
import {BiSolidShow} from "react-icons/bi";
import {GiEyeTarget} from "react-icons/gi";
import {FaReadme} from "react-icons/fa";
import {BsBuildingAdd} from "react-icons/bs";
import {PiStudentBold} from "react-icons/pi";
const OfficerDashBoard = ({header,profile_pic}) => {
  return (
    <section className=" mx-auto">
      <DashBoard header={header} profile_pic={profile_pic} />
      <div className="h-screen bg-slate-800">
        <BorderLine header={"Your Services"} />
        <div className="flex flex-col md:flex-row bg-slate-800 mt-10 gap-10 justify-center items-center flex-wrap mb-4">
          <DashBoardCards
            image={images.add_warden}
            alt={"Add warden"}
            content={"Add or Update Warden"}
            link={"/add-warden"}
            linkcontent={"Add"}
            icon=<AiOutlineUsergroupAdd />
          />

          <DashBoardCards
            image={images.add_care_taker}
            alt={"Add caretaker"}
            content={"Add or Update CareTaker"}
            link={"/add-caretaker"}
            linkcontent={"Add"}
            icon=<GrAddCircle />
          />

          <DashBoardCards
            image={images.complaints}
            alt={"complaints"}
            content={"Get All Complaints"}
            link={"/"}
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
            link={"/"}
            linkcontent={"Read"}
            icon=<FaReadme />
          />

          <DashBoardCards
            image={images.add_hostels}
            alt={"Add Hostels"}
            content={"Add or update Hostels"}
            link={"/add-hostels"}
            linkcontent={"Add"}
            icon=<BsBuildingAdd />
          />

          <DashBoardCards
            image={images.students}
            alt={"Show all students"}
            content={"Show all students"}
            link={"/show-students"}
            linkcontent={"Add"}
            icon=<PiStudentBold />
          />
        </div>
      </div>
    </section>
  );
};

export default OfficerDashBoard;

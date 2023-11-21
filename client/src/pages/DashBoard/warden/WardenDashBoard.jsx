import React from "react";
import DashBoard from "../Container/DashBoard";
import DashBoardCards from "../../../components/cards/DashBoardCards";
import { images } from "../../../constants";
import BorderLine from "../../../helper/BorderLine";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {GrAddCircle} from "react-icons/gr"
import {BiShower, BiSolidShow} from "react-icons/bi";
import {GiEyeTarget} from "react-icons/gi";
import {FaReadme} from "react-icons/fa";
import {BsBuildingAdd} from "react-icons/bs";
import {PiStudentBold} from "react-icons/pi";
const WardenDashBoard = ({header,profile_pic}) => {
  return (
    <section className=" mx-auto">
      <DashBoard header={header} profile_pic={profile_pic} />
      <div className="h-screen bg-slate-800">
        <BorderLine header={"Your Services"} />
        <div className="flex flex-col md:flex-row bg-slate-800 mt-10 gap-10 justify-center items-center flex-wrap mb-4">
          <DashBoardCards
            image={images.students}
            alt={"Add Students"}
            content={"Add or Update students"}
            link={"/add-students"}
            linkcontent={"Add"}
            icon=<AiOutlineUsergroupAdd />
          />

          <DashBoardCards
            image={images.add_care_taker}
            alt={"Show caretaker"}
            content={"Get All CareTaker"}
            link={"/show-caretaker-warden"}
            linkcontent={"Show"}
            icon=<BiShower />
          />

          <DashBoardCards
            image={images.complaints}
            alt={"complaints"}
            content={"Get All Complaints"}
            link={"/get-complaint-warden"}
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
            image={images.students}
            alt={"Get All students"}
            content={"Show All students"}
            link={"/show-students-warden"}
            linkcontent={"Show"}
            icon=<GiEyeTarget />
          />
          
        </div>
      </div>
    </section>
  );
};

export default WardenDashBoard;

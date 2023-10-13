import React, { useState, useCallback } from "react";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import LoginPage from "../login/LoginPage";
const Dash = () => {
  // console.log("loginstudent", typeof loginstudent);
  const [showmodals, setshowmodals] = useState(false);
  const [loginlink, setloginlink] = useState("");
  // const storeFunction = useCallback((data) => {
  //   if(data==="student")
  //   {
  //     setloginlink(loginstudent)
  //   }
  //   setshowmodals(true);
  // }, []);

  return (
    <section className="w-full">
      <div className="relative w-full bg-cover bg-dark-soft">
        <img
          src={images.front_gate_1}
          alt="chitkara_image"
          className="object-cover h-full w-full absolute mix-blend-overlay"
        />

        <div className="relative h-screen w-full gap-y-9 flex flex-col items-center">
          <Clock
            className="text-7xl mt-10 text-center w-full"
            format={"hh:mm:ssa"}
            ticking={true}
            timezone={"Asia/KolKata"}
          />
          <div className="flex gap-x-9 absolute bottom-0 flex-wrap md:items-center md:justify-center w-full gap-y-9  justify-between p-3">
            <div className="bg-blue-500 rounded-xl p-1 md:p-2 md:w-1/4 md:h-20 text-center  lg:p-3 text-2xl md:text-2xl lg:text-3xl">
              <Link
                onClick={() => {
                  setloginlink("student");
                  setshowmodals(true);
                }}
              >
                Student Login
              </Link>
            </div>
            <div className="bg-green-500 rounded-xl p-1 md:p-2 md:w-1/4 md:h-20 text-center  lg:p-3 text-2xl md:text-2xl lg:text-3xl">
              <Link
                onClick={() => {
                  setloginlink("caretaker");
                  setshowmodals(true);
                }}
              >
                Care Taker Login
              </Link>
            </div>
            <div className="bg-orange-500 rounded-xl p-1 md:p-2 md:w-1/4 md:h-20 text-center  lg:p-3 text-2xl md:text-2xl lg:text-3xl">
              <Link
                onClick={() => {
                  setloginlink("warden");
                  setshowmodals(true);
                }}
              >
                Warden Login
              </Link>
            </div>
            <div className="bg-red-500 rounded-xl p-1 md:p-2 md:w-1/4 md:h-20 text-center  lg:p-3 text-2xl md:text-2xl lg:text-3xl">
              <Link
                onClick={() => {
                  setloginlink("officer");
                  setshowmodals(true);
                }}
              >
                Management Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showmodals && (
        <LoginPage
          isvisible={showmodals}
          login={loginlink}
          onclose={() => setshowmodals(false)}
        />
      )}
    </section>
  );
};

export default Dash;

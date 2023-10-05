import React from "react";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
const Dash = () => {
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
          <div className="flex gap-x-9 absolute bottom-0  w-full  justify-between p-3">
            <div className="bg-blue-500 rounded-xl p-4 md:p-3 lg:p-3 text-4xl md:text-4xl lg:text-3xl">
              <Link to='/'>Login</Link>
            </div>
            <div className="bg-orange-500 rounded-xl p-4 md:p-3 lg:p-3 text-4xl md:text-4xl lg:text-3xl">
              <Link to='/'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dash;

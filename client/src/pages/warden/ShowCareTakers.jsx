import React, { useEffect } from "react";
import TagLine from "../../components/TagLines/TagLine";
import { useSelector } from "react-redux";

const ShowCareTakers = () => {
  const getcaretakerdata=useSelector((state)=>state?.caretakers);
  
  return (
    <div className="mt-5">
      <TagLine heading={"Show All CareTakers"} />
      {/* {console.log(hostelsdata)} */}
      <table className="mt-5 w-full  text-center border-separate border-spacing-1 p-0 border border-slate-500 md:table-auto table-fixed text-sm md:text-2xl">
        <thead>
          <tr>
            <th className="overflow-auto hidden md:block border-4 border-black">ID:</th>
            <th className="overflow-auto border-4 border-black">Name:</th>
            <th className="overflow-auto hidden lg:block border-4 border-black">Address:</th>
            <th className="overflow-auto border-4 border-black">phoneNo:</th>
            <th className="overflow-auto border-4 border-black">email:</th>
            <th className="overflow-auto hidden md:block border-4 border-black ">gender:</th>
          </tr>
        </thead>
          {getcaretakerdata && getcaretakerdata?.caretakersInfo && getcaretakerdata?.caretakersInfo?.data ?(<>
            {getcaretakerdata?.caretakersInfo?.data.map((val)=>{
              return (
                    <tr>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val._id}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.name}</td>
                      <td className="hidden lg:block border-4 border-slate-600">{val.address}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.phoneNo}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.email}</td>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val.gender}</td>
                    </tr>
                  );
            })}
          </>):(<>
            <h2 className="text-4xl text-center font-bold">Loading.....</h2>
          </>)}
      </table>
    </div>
  );
};

export default ShowCareTakers;

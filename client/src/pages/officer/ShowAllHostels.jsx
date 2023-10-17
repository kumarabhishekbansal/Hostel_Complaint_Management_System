import React from "react";
import TagLine from "../../components/TagLines/TagLine";
const ShowAllHostels = ({hostelsdata,hosteldataloading}) => {
  // const { data: hostelsdata, isLoading: hosteldataloading } = useQuery({
  //   queryFn: () => {
  //     console.log("start");
  //     return getHostels();
  //   },
  //   queryKey: ["gethostelsdata"],
  // });

  return (
    <div className="mt-5">
      <TagLine heading={"Show All Hostels"} />
      {/* {console.log(hostelsdata)} */}
      <table className="mt-5 w-full text-center border-separate border-spacing-1 p-0 border border-slate-500 md:table-auto table-fixed text-sm md:text-2xl">
        <thead>
          <tr>
            <th className="overflow-auto hidden md:block border-4 border-black">ID:</th>
            <th className="overflow-auto border-4 border-black">Name:</th>
            <th className="overflow-auto hidden md:block border-4 border-black">Description:</th>
            <th className="overflow-auto border-4 border-black">Total Rooms:</th>
            <th className="overflow-auto border-4 border-black">Available Rooms:</th>
            <th className="overflow-auto hidden md:block border-4 border-black ">Total Floors:</th>
            <th className="overflow-auto border-4 border-black">Total Students:</th>
            <th className="overflow-auto hidden md:block border-4 border-black">Accomodate Students:</th>
          </tr>
        </thead>
        {hostelsdata && hostelsdata?.data?.length > 0 ? (
          <>
            <tbody>
              {hostelsdata &&
                hostelsdata?.data &&
                hostelsdata?.data.map((val) => {
                  return (
                    <tr>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val._id}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.hostel_name}</td>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val.hostel_description}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.totalRooms}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.roomsAvailable}</td>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val.totalFloors}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.totalStudents}</td>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val.avialableStudents}</td>
                    </tr>
                  );
                })}
            </tbody>
          </>
        ) : (
          <>
          {hosteldataloading && <h2 className="text-4xl text-center font-bold">Loading.....</h2>}
            
          </>
        )}
      </table>
    </div>
  );
};

export default ShowAllHostels;

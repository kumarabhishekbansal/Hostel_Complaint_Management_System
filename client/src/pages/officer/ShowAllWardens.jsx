import React from "react";
import TagLine from "../../components/TagLines/TagLine";

const ShowAllWardens = ({wardensdata,wardendataloading}) => {

  // const { data: wardensdata, isLoading: wardendataloading } = useQuery({
  //   queryFn: () => {
  //     return getWardens();
  //   },
  //   queryKey: ["getwardensdata"],
  // });

  return (
    <div className="mt-5">
      <TagLine heading={"Show All Wardens"} />
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
            <th className="overflow-auto border-4 border-black">hostel:</th>
          </tr>
        </thead>
        {wardensdata && wardensdata?.data?.length > 0 ? (
          <>
            <tbody>
              {wardensdata &&
                wardensdata?.data &&
                wardensdata?.data.map((val) => {
                  return (
                    <tr>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val._id}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.name}</td>
                      <td className="hidden lg:block border-4 border-slate-600">{val.address}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.phoneNo}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.email}</td>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">{val.gender}</td>
                      <td className="overflow-auto border-4 border-slate-600">{val.hostelAssign.hostel_name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </>
        ) : (
          <>
          {wardendataloading && <h2 className="text-4xl text-center font-bold">Loading.....</h2>}
            
          </>
        )}
      </table>
    </div>
  );
};

export default ShowAllWardens;

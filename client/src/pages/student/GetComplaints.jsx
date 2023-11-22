import React, { useState, useEffect } from "react";
import TagLine from "../../components/TagLines/TagLine";
import { useSelector } from "react-redux";
import { complaintsTag, statusTag } from "../../services/Student";
import { Link } from "react-router-dom";
import {useQueryClient,useQuery } from "@tanstack/react-query";
import {getComplaints } from "../../services/Student";
const GetComplaints = () => {
  const queryclient = useQueryClient();
  const complaints = useSelector((state) => state.complaints);
  const [data, setdata] = useState(complaints?.complaintsInfo?.data);
  const [filters, setfilters] = useState({
    status: "",
    tag: "",
  });

  const handlestatus = (e) => {
    // console.log(e,"hello");
    setfilters({ ...filters, status: e });
  };

  const handletags = (e) => {
    // console.log(e,"hello");
    setfilters({ ...filters, tag: e });
  };

  useEffect(() => {
    // console.log("Data : ",complaints?.complaintsInfo?.data);
    let results = complaints?.complaintsInfo?.data;
    if (filters.status !== "") {
      results = complaints?.complaintsInfo?.data.filter((val) => {
        return val.status === filters.status;
      });
    }
    if(filters.tag!=="")
    {
      results = results.filter((val) => {
        return val.tags === filters.tag;
      });
    }
    setdata(results);
  }, [filters]);

  useEffect(()=>{
    // const { data: complaintdata, isLoading: complaintloading } = useQuery({
    //   queryFn: () => {
    //     return getComplaints();
    //   },
    //   queryKey: ["getcomplaintsdata"],
    // });
    getComplaints();
  },[])
  return (
    <div className="mt-5">
      <TagLine heading={"Get Your Complaints"} />

      {/* filtering */}
      <div className="text-center w-full m-20 flex flex-col gap-y-9">
        <h2 className="text-4xl">Filters : </h2>

        <div className="flex flex-col gap-9">
          <div className="flex gap-x-4 w-full">
            <h2
              className="font-bold "
              onClick={() => setfilters({ ...filters, status: "" })}
            >
              Status :{" "}
            </h2>
            {statusTag?.map((val) => {
              return (
                <li className="relative group">
                  <Link
                    className={`cursor-pointer px-4 py-2 group-hover:text-blue-600 group-hover:font-bold group-active:text-red-700 ${
                      filters.status === val.tag_val
                        ? "text-red-500"
                        : "text-black"
                    }`}
                    onClick={() => handlestatus(`${val.tag_val}`)}
                  >
                    {val.tag_val}
                  </Link>
                </li>
              );
            })}
          </div>

          <div className="flex gap-x-4 w-full">
            <h2 className="font-bold" onClick={() => setfilters({ ...filters, tag: "" })}>Tags : </h2>
            {complaintsTag?.map((val) => {
              return (
                <li className="relative group">
                  <Link
                    className={`cursor-pointer px-4 py-2 group-hover:text-blue-600 group-hover:font-bold group-active:text-red-700 ${
                      filters.tag === val.tag_val
                        ? "text-red-500"
                        : "text-black"
                    }`}
                    onClick={() => handletags(`${val.tag_val}`)}
                  >
                    {val.tag_val}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>
      {/* {console.log(hostelsdata)} */}
      <table className="mt-5 w-full  text-center border-separate border-spacing-1 p-0 border border-slate-500 md:table-auto table-fixed text-sm md:text-2xl">
        <thead>
          <tr>
            <th className="overflow-auto hidden md:block border-4 border-black">
              Room No.
            </th>
            <th className="overflow-auto border-4 border-black">Student:</th>
            <th className="overflow-auto hidden lg:block border-4 border-black">
              Issue:
            </th>
            <th className="overflow-auto border-4 border-black">Status:</th>
            <th className="overflow-auto border-4 border-black">Tags:</th>
            <th className="overflow-auto hidden md:block border-4 border-black ">
              assignedTo:
            </th>
          </tr>
        </thead>
        {complaints && complaints?.complaintsInfo?.data?.length > 0 ? (
          <>
            <tbody>
              {data &&
                data.map((val) => {
                  return (
                    <tr>
                      <td className="overflow-auto hidden md:block border-4 border-slate-600">
                        {val.student.roomNo}
                      </td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.student.name}
                      </td>
                      <td className="hidden lg:block border-4 border-slate-600">
                        {val.issue}
                      </td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.status}
                      </td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.tags}
                      </td>
                      {val?.assignedTo?.name && (
                        <td className="overflow-auto hidden md:block border-4 border-slate-600">
                          {val.assignedTo.name}
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </>
        ) : (
          <>
            {<h2 className="text-4xl text-center font-bold">Loading.....</h2>}
          </>
        )}
      </table>
    </div>
  );
};

export default GetComplaints;

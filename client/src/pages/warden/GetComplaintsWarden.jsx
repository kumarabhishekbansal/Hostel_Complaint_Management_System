import React, { useState, useEffect } from "react";
import TagLine from "../../components/TagLines/TagLine";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import { useSelector } from "react-redux";
import { complaintsTag, statusTag } from "../../services/Student";
import {
  getComplaints,
  getcaretakers,
  assigncaretaker,
} from "../../services/Warden";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UseSelector, useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComplaintActions } from "../../store/reducers/Complaints";
import { CareTakerActions } from "../../store/reducers/CareTakerSlice";
const GetComplaintsWarden = () => {
  const complaints = useSelector((state) => state.complaints);
  const [data, setdata] = useState(complaints?.complaintsInfo?.data);
  const [caretakerassign, setcaretakerassign ] = useState(null);
  const caretakers = useSelector((state) => state.caretakers);
  const [filters, setfilters] = useState({
    status: "",
    tag: "",
  });

  const handlestatus = (e) => {
    setfilters({ ...filters, status: e });
  };

  const handletags = (e) => {
    // console.log(e,"hello");
    setfilters({ ...filters, tag: e });
  };

  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const [Tag, setTag] = useState("");

  const { data: complaintdata, isLoading: complaintloading } = useQuery({
    queryFn: () => {
      return getComplaints();
    },
    queryKey: ["getcomplaintsdata_warden"],
  });

  const { data: caretakerdata, isLoading: caretakerloading } = useQuery({
    queryFn: () => {
      return getcaretakers();
    },
    queryKey: ["getcaretakerdata_warden"],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ complaint_id, assignedTo }) => {
      return assigncaretaker({ complaint_id, assignedTo });
    },
    onSuccess: (data) => {
      toast.success("Assigned");
      console.log("Data : ",data);
      queryclient.invalidateQueries(["getcaretakerdata_warden"]);
      queryclient.invalidateQueries(["getcomplaintsdata_warden"]);
      dispatch(ComplaintActions.setcomplaintsInfo(data));
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const handleSelect = (e) => {
    console.log("slect",e.target);
    setcaretakerassign(e.target.value);
  };

  const submitHandler = (complaint_id ) => {
    const assignedTo = caretakerassign;
    // console.log(complaint_id,assignedTo);
    mutate({ complaint_id, assignedTo });
  };

  useEffect(() => {
    return async () => {
      let data = await getComplaints();
      if (JSON.parse(localStorage.getItem("complaints"))) {
        dispatch(ComplaintActions.setcomplaintsInfo(data));
      }
      data = await getcaretakers();
      if (JSON.parse(localStorage.getItem("caretakers"))) {
        dispatch(CareTakerActions.setCareTakerInfo(data));
      }
    };
  }, [complaintdata, caretakerdata]);

  useEffect(() => {
    // console.log("Data : ",complaints?.complaintsInfo?.data);
    let results = complaints?.complaintsInfo?.data;
    if (filters.status !== "") {
      results = complaints?.complaintsInfo?.data.filter((val) => {
        return val.status === filters.status;
      });
    }
    if (filters.tag !== "") {
      results = results.filter((val) => {
        return val.tags === filters.tag;
      });
    }
    setdata(results);
  }, [filters]);

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
            <h2
              className="font-bold"
              onClick={() => setfilters({ ...filters, tag: "" })}
            >
              Tags :{" "}
            </h2>
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
            {/* <th className="overflow-auto border-4 border-black">Student:</th> */}

            <th className="overflow-auto border-4 border-black">Status:</th>
            <th className="overflow-auto border-4 border-black">Tags:</th>
            <th className="overflow-auto hidden md:block border-4 border-black ">
              assignedTo:
            </th>
            <th className="overflow-auto border-4 border-black">
              Issue:
            </th>
            <th className="overflow-auto border-4 border-black">
              Submit:
            </th>
          </tr>
        </thead>
        {complaints && complaints?.complaintsInfo?.data?.length > 0 ? (
          <>
            <tbody>
              {data &&
                data.map((val) => {
                  return (
                    <tr className="hover:bg-slate-500 h-20">
                      <td className="overflow-auto h-20  hidden md:block border-4 border-slate-600">
                        {val.student.roomNo}
                      </td>

                      <td className="overflow-auto h-20 border-4 border-slate-600">
                        {val.status}
                      </td>
                      <td className="overflow-auto h-20 border-4 border-slate-600">
                        {val.tags}
                      </td>
                      <td className="h-20">
                        {/* care takers */}

                        <div className="relative">
                          <select
                            // value={(caretakerassign!=null && val.assignedTo!==caretakerassign?caretakerassign:val.assignedTo)}
                            value={val.assignedTo || caretakerassign}
                            onChange={handleSelect}
                            required
                            className={`rounded px-3 py-2 focus:ring focus:border-blue-300 text-center border-4 border-slate-400 outline-none p-4 text-3xl font-bold`}
                          >
                            {caretakers &&
                              caretakers?.caretakersInfo &&
                              caretakers?.caretakersInfo?.data &&
                              caretakers?.caretakersInfo?.data.map((val) => {
                                return (
                                  <option value={val._id}>{val.name}</option>
                                );
                              })}
                          </select>
                        </div>
                      </td>
                      <td className="h-20 border-4 border-slate-600">
                        {val.issue}
                      </td>

                      <td className="h-20 border-4 border-slate-600">
                          <button className="border-2 rounded-xl p-2 bg-dark-soft text-white hover:scale-110"
                          onClick={()=>submitHandler(`${val._id}`)}
                          >Assigned</button>
                      </td>
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

export default GetComplaintsWarden;
import React, { useEffect } from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import TagLine from "../../components/TagLines/TagLine";
import { getAllStudents } from "../../services/Officer";
import { StudentActions } from "../../store/reducers/StudentsSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
const ShowAllStudents = () => {
  const dispatch = useDispatch();
  const { data: StudentData, isLoading: studentsDataLoading } = useQuery({
    queryFn: () => {
      return getAllStudents();
    },
    queryKey: ["allstudentsdata"],
  });

  useEffect(() => {
    return () => {
      const data = getAllStudents();
      if (JSON.parse(localStorage.getItem("students"))) {
        dispatch(StudentActions.setstudentsInfo(data));
      }
    };
  }, []);

  return (
    <section className="flex flex-col">
      <TopNavBar />
      <TagLine heading={"Show All Students"} />
      <table className="mt-5 w-full  text-center border-separate border-spacing-1 p-0 border border-slate-500 md:table-auto table-fixed text-sm md:text-2xl">
        <thead>
          <tr>
            <th className="overflow-auto border-4 border-black">Name:</th>
            <th className="overflow-auto border-4 border-black">phoneNo:</th>
            <th className="overflow-auto border-4 border-black">email:</th>
            <th className="overflow-auto border-4 border-black ">gender:</th>
            <th className="overflow-auto border-4 border-black">hostel:</th>
          </tr>
        </thead>
        {StudentData && StudentData?.data?.length > 0 ? (
          <>
            <tbody>
              {StudentData &&
                StudentData?.data &&
                StudentData?.data.map((val) => {
                  return (
                    <tr>
                      <td className="overflow-auto border-4 border-slate-600">{val.name}</td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.phoneNo}
                      </td>
                      <td className="overflow-auto border-4 border-slate-600">{val.email}</td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.gender}
                      </td>
                      <td className="overflow-auto border-4 border-slate-600">
                        {val.hostelAssign.hostel_name}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </>
        ) : (
          <>
            {studentsDataLoading && (
              <h2 className="text-4xl text-center font-bold">Loading.....</h2>
            )}
          </>
        )}
      </table>
    </section>
  );
};

export default ShowAllStudents;

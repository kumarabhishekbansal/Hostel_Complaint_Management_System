import React, { useEffect, useState } from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import TagLine from "../../components/TagLines/TagLine";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudents, addStudents, getRooms } from "../../services/Warden";
import { toast } from "react-hot-toast";
import InputForms from "../../components/ServicesInputs/InputForms";
import { MdAdd, MdEmail, MdPhone } from "react-icons/md";
import { StudentActions } from "../../store/reducers/StudentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RoomActions } from "../../store/reducers/RoomSlice";
import ShowStudents from "./ShowStudents";
import validator from "validator";

// import { getWardens } from "../../services/Officer";
// import { HostelActions } from "../../store/reducers/HostelSlice";
const AddStudents = () => {
  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const [selectroom, setselectroom] = useState(0);
  const [selectfloor, setselectfloor] = useState(0);
  // const wardenstate = useSelector((state) => state.user);
  const roomstate = useSelector((state) => state.rooms);
  const { data: studentsdata, isLoading: studentdataloading } = useQuery({
    queryFn: () => {
      return getStudents();
    },
    queryKey: ["getstudentsdata"],
  });

  const { data: roomsdata, isLoading: roomdataloading } = useQuery({
    queryFn: () => {
      console.log("hi");
      return getRooms();
    },
    queryKey: ["getroomsdata"],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, phoneNo, email, roomNo, department, floorNo }) => {
      //   console.log("go to add students");
      return addStudents({ name, phoneNo, email, roomNo, department, floorNo });
    },
    onSuccess: (data) => {
      toast.success("student Added Successfully");
      // console.log("Data");
      // console.log(data, " yoo");
      localStorage.setItem("students", JSON.stringify(data));
      dispatch(StudentActions.setstudentsInfo(data));
      // queryclient.invalidateQueries(["gethostelsdata"]);
      queryclient.invalidateQueries(["getstudentsdata"]);
      queryclient.invalidateQueries(["getroomsdata"]);
      dispatch(RoomActions.setRoomInfo(roomsdata));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNo: "",
      email: "",
      department: "",
    },
    mode: "onChange",
  });

  const submitHandler = ({
    name,
    phoneNo,
    email,
    department,
  }) => {
    if (!validator.isEmail(email)) {
      toast.error("Entered Email is not correct");
      return;
    }
    // console.log(
    //   "data is : ",
    //   name,
    //   phoneNo,
    //   email,
    //   roomNo,
    //   department,
    //   floorNo
    // );
    const roomNo=selectroom;
    const floorNo=~~selectfloor;
    mutate({ name, phoneNo, email, roomNo, department, floorNo });
  };

  const changeSelect = (e) => {
    console.log("select , ", e.target.value);
    setselectroom(e.target.value);
    setselectfloor(e.target.value/100);
  };

  useEffect(() => {
    return async () => {
      let data = await getRooms();
      if (JSON.parse(localStorage.getItem("rooms"))) {
        dispatch(RoomActions.setRoomInfo(data));
      }
      data = await getStudents();
      if (JSON.parse(localStorage.getItem("students"))) {
        dispatch(StudentActions.setstudentsInfo(data));
      }
    };
  }, [roomsdata]);
  return (
    <section className="flex flex-col">
      <TopNavBar />
      <TagLine heading={"Add Students"} />
      {/* add students */}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row flex-wrap md:gap-x-5 gap-y-5 md:justify-evenly items-center justify-center">
          {/* student name */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Enter Student Name"}
            value={""}
            name={"name"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Student Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Student Name is required",
              },
            }}
          />

          {/* department */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Enter Department Name"}
            value={""}
            name={"department"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Department Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Department Name is required",
              },
            }}
          />
          {/*phone no. */}
          <InputForms
            children={<MdPhone />}
            placeholder={"Add Phone No."}
            value={""}
            name={"phoneNo"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              required: {
                value: true,
                message: "Phone no. is required",
              },
            }}
          />
          {/* Email */}
          <InputForms
            children={<MdEmail />}
            placeholder={"Enter email"}
            value={""}
            name={"email"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              required: {
                value: true,
                message: "Email is required",
              },
            }}
          />

          {/* {select Room assign } */}

          <div className="relative h-10 lg:mt-12 md:mt-10">
            <label htmlFor="choose_Room" className="text-center font-bold">
              Choose A Room No. :{" "}
            </label>
            <select
              id="choose_Room"
              value={selectroom}
              onChange={changeSelect}
              className={`text-center border-4 border-slate-400 outline-none w-full p-4 text-3xl font-bold`}
            >
              {roomstate &&
                roomstate?.RoomInfo &&
                roomstate?.RoomInfo?.map((val) => {
                  return (
                    <option value={val.roomNumber}>
                      {val.roomNumber} : {val.capacity}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="relative top-24 bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>

      <div className="mt-24 w-full border-4">
        <ShowStudents
          studentsdata={studentsdata}
          studentdataloading={studentdataloading}
        />
      </div>
    </section>
  );
};

export default AddStudents;

import React, { useEffect, useState } from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import TagLine from "../../components/TagLines/TagLine";
import { useForm } from "react-hook-form";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { addCareTaker, getHostels } from "../../services/Officer";
import { toast } from "react-hot-toast";
import InputForms from "../../components/ServicesInputs/InputForms";
import { MdAdd, MdEmail, MdPhone } from "react-icons/md";
import {CareTakerActions} from "../../store/reducers/CareTakerSlice"
import { useDispatch, useSelector } from "react-redux";
import ShowAllCareTakers from "./ShowAllCareTakers";
import validator from "validator";
import { getCareTaker } from "../../services/Officer";
import { HostelActions } from "../../store/reducers/HostelSlice";

const AddCareTakers = () => {
  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const [selecthostel, setselecthostel] = useState("");
  const hostelstate = useSelector((state) => state.hostels);

  const { data: caretakersdata, isLoading: caretakerdataloading } = useQuery({
    queryFn: () => {
      return getCareTaker();
    },
    queryKey: ["getcaretakersdata"],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, phoneNo, email, hostelAssign }) => {
    //   console.log("go to add care takers");
      return addCareTaker({ name, phoneNo, email, hostelAssign });
    },
    onSuccess: (data) => {
      toast.success("care taker Added Successfully");
      // console.log("Data");
      // console.log(data, " yoo");
      localStorage.setItem("caretakers", JSON.stringify(data));
      dispatch(CareTakerActions.setCareTakerInfo(data));
      // queryclient.invalidateQueries(["gethostelsdata"]);
      queryclient.invalidateQueries(["getcaretakersdata"]);
     
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
    },
    mode: "onChange",
  });

  const submitHandler = ({ name, phoneNo, email }) => {
    if (!validator.isEmail(email)) {
      toast.error("Entered Email is not correct");
      return;
    }
    const hostelAssign = selecthostel;
    mutate({ name, phoneNo, email, hostelAssign });
  };

  const changeSelect = (e) => {
    console.log("select");
    queryclient.invalidateQueries(["gethostelsdata"]);
    setselecthostel(e.target.value);
  };

  useEffect(()=>{
    return async()=>{
      let data=await getHostels();
      if(JSON.parse(localStorage.getItem("hostels")))
      {
        dispatch(HostelActions.setHostelsInfo(data));
      }
      data=await getCareTaker();
      if(JSON.parse(localStorage.getItem("caretakers")))
      {
        dispatch(CareTakerActions.setCareTakerInfo(data));
      }
    }
  },[]);
  return (
    <section className="flex flex-col">
      <TopNavBar />
      <TagLine heading={"Add Care Takers"} />
      {/* input forms */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row flex-wrap md:gap-x-5 gap-y-5 md:justify-evenly items-center justify-center">
          {/* warden name */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Enter Care taker Name"}
            value={""}
            name={"name"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Care taker Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Care taker Name is required",
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

          {/* {select hostel assign } */}

          <div className="relative h-10 lg:mt-12 md:mt-10">
            {/* {hostelstate &&
              hostelstate?.hostelsInfo &&
              hostelstate?.hostelsInfo?.data &&
              console.log(hostelstate?.hostelsInfo?.data)} */}
            <label htmlFor="choose_hostel" className="text-center font-bold">Choose A hostel : </label>
            <select
              id="choose_hostel"
              value={selecthostel}
              onChange={changeSelect}
              className={`text-center border-4 border-slate-400 outline-none w-full p-4 text-3xl font-bold`}
            >
              {hostelstate &&
                hostelstate?.hostelsInfo &&
                hostelstate?.hostelsInfo?.data &&
                hostelstate?.hostelsInfo?.data.map((val) => {
                  return (<option value={val._id}>{val.hostel_name}</option>)
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
        <ShowAllCareTakers caretakersdata={caretakersdata} caretakerdataloading={caretakerdataloading}/>
      </div>
    </section>
  );
};

export default AddCareTakers;

import React,{useEffect} from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import TagLine from "../../components/TagLines/TagLine";
import { useForm } from "react-hook-form";
import {  useMutation,useQueryClient,useQuery } from "@tanstack/react-query";
import { addHostels } from "../../services/Officer";
import { toast } from "react-hot-toast";
import InputForms from "../../components/ServicesInputs/InputForms";
import { MdAdd } from "react-icons/md";
import {HostelActions} from "../../store/reducers/HostelSlice";
import { useDispatch } from "react-redux";
import ShowAllHostels from "./ShowAllHostels";
import { getHostels } from "../../services/Officer";
import { WardenActions } from "../../store/reducers/WardenSlice";
const AddHostels = () => {
  const dispatch=useDispatch();
  const queryclient=useQueryClient();
  const { data: hostelsdata, isLoading: hosteldataloading } = useQuery({
    queryFn: () => {
      console.log("start");
      return getHostels();
    },
    queryKey: ["gethostelsdata"],
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ hostel_name, hostel_description, totalRooms }) => {
      return addHostels({ hostel_name, hostel_description, totalRooms });
    },
    onSuccess: (data) => {
      toast.success("Hostel Added Successfully");
      localStorage.setItem("hostels",JSON.stringify(data));
      dispatch(HostelActions.setHostelsInfo(data));
      queryclient.invalidateQueries(["gethostelsdata"]);
      console.log(data);
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
      hostel_name: "",
      hostel_description: "",
      totalRooms: 0,
    },
    mode: "onChange",
  });

  const submitHandler = ({ hostel_name, hostel_description, totalRooms }) => {
    mutate({ hostel_name, hostel_description, totalRooms });
  };
  useEffect(()=>{
    return async()=>{
      const data=await getHostels();
      if(JSON.parse(localStorage.getItem("hostels")))
      {
        dispatch(HostelActions.setHostelsInfo(data));
      }
      if(JSON.parse(localStorage.getItem("wardens")))
      {
        dispatch(WardenActions.setWardensInfo(data));
      }
    }
  },[]);
  return (
    <section className="flex flex-col">
      <TopNavBar />
      <TagLine heading={"Add Hostels"} />
      {/* input forms */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col md:flex-row flex-wrap md:gap-x-5 gap-y-5 md:justify-evenly">
          {/* hostel name */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Add Hostel Name"}
            value={""}
            name={"hostel_name"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Hostel Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Hostel Name is required",
              },
            }}
          />

          {/* hostel description */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Add hostel Description"}
            value={""}
            name={"hostel_description"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Hostel description length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Hostel description is required",
              },
            }}
          />
          {/* total rooms */}
          <InputForms
            children={<MdAdd />}
            placeholder={"Add TotalRooms"}
            value={""}
            name={"totalRooms"}
            type={"Number"}
            register={register}
            errors={errors}
            options={{
              required: {
                value: true,
                message: "Hostel totalRooms is required",
              },
            }}
          />
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
      <ShowAllHostels hostelsdata={hostelsdata} hosteldataloading={hosteldataloading} />
      </div>
    </section>
  );
};

export default AddHostels;

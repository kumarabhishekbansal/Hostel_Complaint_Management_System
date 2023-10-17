import React, { useState, useEffect } from "react";
import TopNavBar from "../../components/OverNavBar/TopNavBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComplaint, getComplaints,complaintsTag } from "../../services/Student";
import TagLine from "../../components/TagLines/TagLine";
import { toast } from "react-hot-toast";
import InputForms from "../../components/ServicesInputs/InputForms";
import { UseSelector, useDispatch } from "react-redux";
import { ComplaintActions } from "../../store/reducers/Complaints";
import { useForm } from "react-hook-form";
import { MdAdd, MdWarningAmber } from "react-icons/md";
import { Link } from "react-router-dom";
const CreateIssue = () => {
  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const [Tag, setTag] = useState("");
  const { data: complaintdata, isLoading: complaintloading } = useQuery({
    queryFn: () => {
      return getComplaints();
    },
    queryKey: ["getcomplaintsdata"],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ issue, tags }) => {
      return addComplaint({ issue, tags });
    },
    onSuccess: (data) => {
      toast.success("complaint register successfully");
      localStorage.setItem("complaints", JSON.stringify(data));
      queryclient.invalidateQueries(["getcomplaintsdata"]);
      dispatch(ComplaintActions.setcomplaintsInfo(data));
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const handleSelect = (e) => {
    setTag(e.target.value);
  };

  const submitHandler = ({ issue }) => {
    const tags = Tag;
    mutate({ issue, tags });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      issue: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    return async () => {
      let data = await getComplaints();
      if (JSON.parse(localStorage.getItem("complaints"))) {
        dispatch(ComplaintActions.setcomplaintsInfo(data));
      }
    };
  }, [complaintdata]);

  return (
    <section className="flex flex-col">
      <TopNavBar />
      <TagLine heading={"Create An Issue"} />

      {/* create an issue */}

      <form onSubmit={handleSubmit(submitHandler)}>
            {/* issue */}

            <InputForms
            children={<MdWarningAmber />}
            placeholder={"Enter Issue"}
            value={""}
            name={"issue"}
            type={"text"}
            register={register}
            errors={errors}
            options={{
              minLength: {
                value: 1,
                message: "Issue  length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Issue Name is required",
              },
            }}
          />
            {/* tags */}

          <div className="relative h-10 mt-32">
            <label htmlFor="choose_tag" className="text-center font-bold">
              Choose A Suitable tag for this :{" "}
            </label>
            <select
              id="choose_tag"
              value={Tag}
              onChange={handleSelect}
              required
              className={`rounded px-3 py-2 pr-10 focus:ring focus:border-blue-300 text-center border-4 border-slate-400 outline-none p-4 text-3xl font-bold`}
            >
              {complaintsTag &&
                complaintsTag?.map((val) => {
                  return (
                    <option value={val.tag_val}>
                      {val.tag_val}
                    </option>
                  );
                })}
            </select>
          </div>
        
          <button
          type="submit"
          disabled={isLoading}
          className="relative top-24 bg-orange-500 text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Create
        </button>
      </form>

      <Link
      to="/get-complaint-student"
          className=" text-center relative top-24 bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Get Your Complaints
        </Link>
    </section>
  );
};

export default CreateIssue;

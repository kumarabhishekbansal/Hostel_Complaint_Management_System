import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateCareTakerProfile } from "../../../services/user";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../../store/reducers/UserSlice";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { HiOutlineCamera } from "react-icons/hi";
import InputForms from "../../../components/ProfileInputs/InputForms";
import ReadOnlyForm from "../../../components/ProfileInputs/ReadOnlyForm";
import ValueInputForms from "../../../components/ProfileInputs/ValueInputForms";
import { ImageUpload } from "../../../helper/ImageUploader/ImageUpload";
import { passwordvalidate,matchPassword } from "../../../helper/validations/PasswordValidate";
import { emailvalidate } from "../../../helper/validations/EmailValidation";
import { BsFillPersonFill, BsRecordCircle } from "react-icons/bs";
import {
  MdAddCard,
  MdBuild,
  MdDateRange,
  MdEmail,
  MdHouse,
  MdOutlineTransgender,
  MdPassword,
  MdPhone,
} from "react-icons/md";

const CareTakerProfile = () => {
  // console.log("enter warden profile component");
  const [file, setfile] = useState(null);
  const userstate = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getProfile(`${userstate?.userInfo?.role}`);
    },
    queryKey: ["caretakerprofile"],
  });
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({
      name,
      email,
      phoneNo,
      password,
      confirmpassword,
      profilePic,
      address,
      gender,
      dob,
    }) => {
      return updateCareTakerProfile({
        caretakerdata: {
          name,
          email,
          phoneNo,
          password,
          confirmpassword,
          profilePic,
          address,
          gender,
          dob,
        },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data && data?.data));
      localStorage.setItem("hcmaccount", JSON.stringify(data && data?.data));
      queryClient.invalidateQueries(["caretakerprofile"]);
      toast.success("Profile updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!userstate.userInfo) {
      navigate("/");
    }
  }, [navigate, userstate.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmpassword: "",
      profilePic: "",
      address: "",
      gender: "",
      dob: "",
    },
    values: useMemo(() => {
      return {
        role: profileIsLoading ? "" : profileData?.data?.role,
        name: profileIsLoading ? "" : profileData?.data?.name,
        email: profileIsLoading ? "" : profileData?.data?.email,
        phoneNo: profileIsLoading ? "" : profileData?.data?.phoneNo,
        address: profileIsLoading ? "" : profileData?.data?.address,
        profilePic: profileIsLoading ? "" : profileData?.data?.profilePic,
        gender: profileIsLoading ? "" : profileData?.data?.gender,
        dob: profileIsLoading ? "" : profileData?.data?.dob,
      };
    }, [
      profileData?.data?.role,
      profileData?.data?.name,
      profileData?.data?.email,
      profileData?.data?.phoneNo,
      profileData?.data?.address,
      profileData?.data?.profilePic,
      profileData?.data?.gender,
      profileData?.data?.dob,
      profileIsLoading,
    ]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const {
      name,
      email,
      phoneNo,
      password,
      confirmpassword,
      address,
      gender,
      dob,
    } = data;
    // console.log(data);
    const profilePic = file===null?profileData?.data?.profilePic:file;
    
    if(password && !passwordvalidate(password))
    {
      toast.error("password is not strong");
      return;
    }else if(password && !confirmpassword)
    {
      toast.error("enter confirm password also");
      return;
    }
    else if(!password && confirmpassword)
    {
      toast.error("enter password also");
      return;
    }else if(password && confirmpassword && !matchPassword(password,confirmpassword))
    {
      toast.error("password and confirm password not matching");
      return;
    }
    if(email && !emailvalidate(email))
    {
      toast.error("email not corrected");
      return;
    }
    mutate({
      name,
      email,
      phoneNo,
      password,
      confirmpassword,
      profilePic,
      address,
      gender,
      dob,
    });
  };
  const handleFileChange = async (e) => {
    const result = await ImageUpload(e);
    console.log(result?.url);
    setfile(result?.url);
  };
  return (
    <section className="container mx-auto">
      <h1 className="text-center text-4xl font-bold">
        Hii, {userstate && userstate?.userInfo?.name}
      </h1>
      {/* <ProfilePicture avatar={userstate && userstate?.userInfo?.profilePic} querykey={"officerprofile"} /> */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden mx-auto m-5 lg:w-40 lg:h-40">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {file || profileData?.data?.profilePic ? (
              <img
                src={file || profileData?.data?.profilePic}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5 md:justify-around m-5">
          {/* values that can be changeable */}
          <div className="flex flex-col w-full md:w-1/2">
            {/* name */}
            <InputForms
              children={<BsFillPersonFill />}
              placeholder={"Full Name"}
              value={""}
              name={"name"}
              type={"text"}
              register={register}
              errors={errors}
              options={{
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              }}
            />
            {/* email */}
            <InputForms
              children={<MdEmail />}
              placeholder={"Email"}
              value={""}
              name={"email"}
              type={"text"}
              register={register}
              errors={errors}
              options={{
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              }}
            />
            {/* New password */}
            <InputForms
              children={<MdPassword />}
              placeholder={"Enter Password"}
              value={""}
              name={"password"}
              type={"password"}
              register={register}
              errors={errors}
            />
            {/* confirm passoword */}
            <InputForms
              children={<MdPassword />}
              placeholder={"Enter Confirm Password"}
              value={""}
              name={"confirmpassword"}
              type={"password"}
              register={register}
              errors={errors}
            />
            {/* address */}
            <InputForms
              children={<MdAddCard />}
              placeholder={"Enter Address"}
              value={""}
              name={"address"}
              type={"text"}
              register={register}
              errors={errors}
            />
          </div>
          <div className="border-t-4 hidden md:block md:border-l-4 border-black">
            {/* nothing only for border line */}
          </div>
          <div className="flex flex-col  w-full md:w-1/2">
            {/* role */}
            <ReadOnlyForm
              children={<BsRecordCircle />}
              name={"role"}
              type={"text"}
              register={register}
            />
            {/* gender */}
            <InputForms
              children={<MdOutlineTransgender />}
              placeholder={"Enter Gender"}
              value={""}
              name={"gender"}
              type={"text"}
              register={register}
              errors={errors}
            />
            {/* dob */}
            <InputForms
              children={<MdDateRange />}
              placeholder={"Enter Date of Birth"}
              value={""}
              name={"dob"}
              type={"date"}
              register={register}
              errors={errors}
            />
            {/* phoneno */}
            <InputForms
              children={<MdPhone />}
              placeholder={"Enter phone number"}
              value={""}
              name={"phoneNo"}
              type={"text"}
              register={register}
              errors={errors}
            />
            {/* hostel */}
            <ValueInputForms
              children={<MdHouse />}
              value={userstate && userstate?.userInfo?.hostel_name}
              type={"text"}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={profileIsLoading || updateProfileIsLoading}
          className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Update
        </button>

        <button className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
          <Link to={"/dashboard"}> Dashboard</Link>
        </button>
      </form>
    </section>
  );
};

export default CareTakerProfile;

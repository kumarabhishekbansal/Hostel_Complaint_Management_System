import React from "react";
import { FaAddressCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { DevTool } from "@hookform/devtools";
import {
  MdPhoneInTalk,
  MdEmail,
  MdAttachEmail,
  MdMessage,
} from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import Cards from "./Cards";
import ContactForm from "../../../components/InputForms/Contact/ContactForm";
import { sentMessage } from "../../../services/SentMessage";
const ContactUs = () => {
  const navigate=useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ fullname, email, message }) => {
      return sentMessage({ fullname, email, message });
    },
    onSuccess: (data) => {
      console.log("Data is ", data);
      toast.success("Your data has been sent successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
    mode:'onChange'
  });

  const submitHandler=(data)=>{
    // console.log("yo ",data);
    // console.log("register is ",register);
    // alert("hiii")
    const {fullname,email,message}=data;
    mutate({fullname,email,message});
  }

  return (
    <section className="container mx-auto flex flex-col mt-10">
      <div className="bg-cover  relative">
        <img
          src="https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="imga"
          className="w-full h-full object-cover absolute mix-blend-overlay opacity-80"
        />
        <div className="relative container mx-auto flex flex-col h-screen mt-10 md:mb-10 lg:mb-0 mb-56">
          <div className="flex flex-col justify-center items-center gap-y-9">
            <h2 className="font-bold lg:text-5xl text-2xl text-white">
              Contact Us
            </h2>
            <ul className="flex flex-col gap-y-3 text-center font-semibold text-slate-800 lg:text-2xl text-base">
              <li>"Caring, Connecting, and Communicating"</li>
              <li>"Your Feedback, Our Commitment"</li>
              <li>"Reach Out, We're Here to Help"</li>
            </ul>
          </div>

          {/* addressing and forms */}

          <div className="flex flex-col md:flex-row absolute md:mt-[250px] mt-[280px]   md:justify-between w-full p-10 justify-center items-center h-1/2  md:gap-x-9 gap-y-5">
            <div className="flex flex-col gap-y-4 p-2">
              <Cards
                header={"Address"}
                content={"Loona Factory Street behind chintpurni temple"}
                children={<FaAddressCard />}
              />
              <Cards
                header={"Phone"}
                content={"+123456789"}
                children={<MdPhoneInTalk />}
              />
              <Cards
                header={"Email"}
                content={"abc@gmail.com"}
                children={<MdEmail />}
              />
            </div>
            {/* form buildation */}
            <div className="flex flex-col gap-y-4 lg:w-1/4 w-fullh-full">
              <form onSubmit={handleSubmit(submitHandler)}>
              <ContactForm
                children={<BsFillPersonFill />}
                placeholder={"Full Name"}
                value={""}
                name={"fullname"}
                type={"text"}
                register={register}
                errors={errors}
                options={
                  {minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  }
                }
              />
              <ContactForm
                children={<MdAttachEmail />}
                placeholder={"Enter Email"}
                value={""}
                name={"email"}
                type={"email"}
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
              <ContactForm
                children={<MdMessage />}
                placeholder={"Message"}
                value={""}
                name={"message"}
                type={"textarea"}
                register={register}
                errors={errors}
                options={
                  {minLength: {
                    value: 5,
                    message: "Message length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Message is required",
                  },
                  }
                }
              />
              <div className="relative top-24 text-center mt-10">
                <button className="border-4 border-dark-hard p-2 rounded-3xl bg-slate-600 w-1/2 focus:scale-125" disabled={isLoading}>
                  SEND
                </button>
              </div>
              <DevTool control={control} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

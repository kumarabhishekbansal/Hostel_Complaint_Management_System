import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { DevTool } from "@hookform/devtools";
import { MdEmail, MdPassword } from "react-icons/md";
import ContactForm from "../../../components/InputForms/Contact/ContactForm";
import { loginofficer,logincaretaker,loginstudent,loginwarden } from "../../../services/user";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ login }) => {
  // console.log("login is : ",login);
  const navigate=useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      if(login==="student")
      {
        return loginstudent({email,password});
      }else if(login==="caretaker")
      {
        return logincaretaker({email,password});
      }else if(login==="warden")
      {
        return loginwarden({email,password});
      }else if(login==="officer")
      {
        return loginofficer({email,password});
      }
    },
    onSuccess: (data) => {
      console.log("Data is ", data);
      toast.success("Login sucess");
      navigate("/dashboard");
      window.location.reload();
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <>
    <div className="text-2xl flex flex-col  p-3 border-4 bg-dark-soft text-white">
    <h2>Login Form</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="text-black">
        
          <ContactForm
            children={<MdEmail />}
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
            children={<MdPassword />}
            placeholder={"Enter Password"}
            value={""}
            name={"password"}
            type={"password"}
            register={register}
            errors={errors}
            options={{
              required: {
                value: true,
                message: "Password is required",
              },
            }}
          />
        
        <div className="relative text-center mt-10">
          <button
            className="border-4 border-dark-hard p-2 rounded-3xl bg-slate-600 w-1/2 focus:scale-125"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
        
      </form>
      </div>
    </>
  );
};

export default LoginForm;

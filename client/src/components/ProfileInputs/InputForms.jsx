import React from "react";

const InputForms = ({
  children,
  placeholder,
  value = "",
  name,
  type,
  register,
  errors = "",
  options = {},
}) => {
  //  console.log(errors[name]);
  return (
    <>
      <div className="relative h-10 mt-10">
        {type === "textarea" && (
          <textarea
            id={name}
            cols="30"
            rows="5"
            placeholder={placeholder}
            className="text-center border-b-4 border-slate-800 outline-none w-full "
            {...register(name, options)}
          />
        )}
        {type === "text" && (
          <input
            type="text"
            id={name}
            placeholder={placeholder}
            className={`text-center border-b-4 border-slate-800 outline-none w-full`}
            {...register(name, options)}
          />
        )}
        {type==="date" && (
            <input
            type="date"
            id={name}
            placeholder={placeholder}
            className={`text-center border-b-4 border-slate-800 outline-none w-full`}
            {...register(name, options)}
          />
        )}

        {type==="password" && (
            <input
            type="password"
            id={name}
            placeholder={placeholder}
            className={`text-center border-b-4 border-slate-800 outline-none w-full`}
            {...register(name)}
          />
        )}

        <div className="absolute p-1 text-dark-soft top-0 left-0">
          {children}
        </div>
        {errors && errors[name] && errors[name]?.message && (
          <p className="text-red-400 text-xl bg-red-700 mt-2">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputForms;

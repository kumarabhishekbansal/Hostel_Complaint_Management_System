import React from "react";

const ValueInputForms = ({
  children,
  value = "",
  type,
}) => {
  //  console.log(errors[name]);
  return (
    <>
      <div className="relative h-10 mt-10">
        {type === "textarea" && (
          <textarea
            cols="30"
            rows="5"
            value={value}
            readOnly
            className="text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full "
          />
        )}
        {type === "text" && (
          <input
            type="text"
            value={value}
            readOnly
            className={`text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full`}
          />
        )}
        {type==="date" && (
            <input
            type="date"
            value={value}
            readOnly
            className={`text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full`}
          />
        )}

        {type==="password" && (
            <input
            type="password"
            value={value}
            readOnly
            className={`text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full`}
          />
        )}

        <div className="absolute p-1 text-dark-soft top-0 left-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default ValueInputForms;

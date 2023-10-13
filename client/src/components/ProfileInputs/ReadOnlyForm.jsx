import React from "react";

const ReadOnlyForm = ({
  children,
  name,
  type,
  register,
}) => {
  //  console.log(errors[name]);
  return (
    <>
      <div className="relative h-10 mt-10">
        {type === "textarea" && (
          <textarea
            cols="30"
            rows="5"
            id={name}
            readOnly
            className="text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full "
            {...register(name)}
          />
        )}
        {type === "text" && (
          <input
            type="text"
            id={name}
            readOnly
            className={`text-center text-green-600 font-bold border-b-4 border-slate-400 outline-none w-full`}
            {...register(name)}
          />
        )}
        {type==="date" && (
            <input
            type="date"
            id={name}
            readOnly
            className={`text-center text-green-600 font-bold border-b-4 border-slate-800 outline-none w-full`}
            {...register(name)}
          />
        )}

        <div className="absolute p-1 text-dark-soft top-0 left-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default ReadOnlyForm;

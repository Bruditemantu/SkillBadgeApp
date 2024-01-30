import React from "react";

const InputField = (props) => {
  return (
    <>
      <>
        <label
          className="block text-sm font-medium text-white mb-2 tracking-wider font-roboto"
        >
          {props.label}
        </label>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          class="mt-1 bg-transparent border-b-2 focus:outline-none text-white text-sm p-2 w-full  font-roboto"
        />
      </>
    </>
  );
};

export default InputField;
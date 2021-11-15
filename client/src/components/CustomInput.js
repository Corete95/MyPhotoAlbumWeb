import React from "react";

const CustomInput = ({ label, value, setValue, type = "text" }) => {
  return (
    <div className="inputDiv">
      <label>{label}</label>
      <input
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;

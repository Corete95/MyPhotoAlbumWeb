import React from "react";
import styled from "styled-components";

const CustomInput = ({ label, value, setValue, type = "text" }) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <input
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-top: 10px;

  input {
    width: 100%;
    height: 20px;
    margin: 1px 0px;
  }
`;

export default CustomInput;

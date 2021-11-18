import React from "react";
import styled from "styled-components";

const ProgressBar = ({ precent }) => {
  return (
    <ProgressBarBoundary>
      <div style={{ width: `${precent}%` }}>{precent}</div>
    </ProgressBarBoundary>
  );
};

const ProgressBarBoundary = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;

  div {
    background-color: green;
    height: 30px;
    padding-top: 10px;
    border-radius: 10px;
    text-align: center;
    color: white;
  }
`;

export default ProgressBar;

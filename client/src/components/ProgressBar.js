import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ precent }) => {
  return (
    <div className="progress-bar-boundary">
      <div style={{ width: `${precent}%` }}>{precent}</div>
    </div>
  );
};

export default ProgressBar;

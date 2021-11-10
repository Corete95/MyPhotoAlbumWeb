import React from "react";
import UploadForm from "./components/UploadForm";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="nav-div">
        <h2>사진첩</h2>
      </div>
      <UploadForm />
    </div>
  );
};

export default App;

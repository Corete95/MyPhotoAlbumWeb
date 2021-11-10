import React from "react";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <div className="nav-div">
        <h2>사진첩</h2>
      </div>
      <UploadForm />
    </div>
  );
};

export default App;

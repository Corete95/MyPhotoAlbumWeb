import React from "react";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ImageList from "./components/ImageList";

const App = () => {
  return (
    <>
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <ToastContainer />
        <div className="nav-div">
          <h2>사진첩</h2>
        </div>
        <UploadForm />
        <ImageList />
      </div>
    </>
  );
};

export default App;

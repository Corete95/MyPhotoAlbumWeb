import React from "react";
import ImageList from "../components/ImageList";
import UploadForm from "../components/UploadForm";

const MainPage = () => {
  return (
    <>
      <div className="nav-div">
        <h2>사진첩</h2>
      </div>
      <UploadForm />
      <ImageList />
    </>
  );
};

export default MainPage;

import React, { useContext } from "react";
import ImageList from "../components/ImageList";
import UploadForm from "../components/UploadForm";
import { AuthContext } from "../context/AuthContext";

const MainPage = () => {
  const [me] = useContext(AuthContext);

  return (
    <>
      <div className="nav-div">
        <h2>사진첩</h2>
      </div>
      {me && <UploadForm />}
      <ImageList />
    </>
  );
};

export default MainPage;

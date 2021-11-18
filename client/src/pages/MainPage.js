import React, { useContext } from "react";
import ImageList from "../components/ImageList";
import UploadForm from "../components/UploadForm";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const MainPage = () => {
  const [me] = useContext(AuthContext);

  return (
    <>
      <NavContainer className="nav-div">
        <h2>사진첩</h2>
      </NavContainer>
      {me && <UploadForm />}
      <ImageList />
    </>
  );
};

const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;

  h2 {
    margin: 15px 0px;
    font-size: 30px;
  }
`;
export default MainPage;

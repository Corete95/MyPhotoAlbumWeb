import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ImageContext } from "../context/ImageContext";
import styled from "styled-components";

const ImageList = () => {
  const { images, myImages, isPublic, setIsPublic } = useContext(ImageContext);
  const [me] = useContext(AuthContext);

  const imgList = (isPublic ? images : myImages).map((image) => (
    <img
      alt=""
      key={image.key}
      src={`http://localhost:5000/uploads/${image.key}`}
    />
  ));

  return (
    <ImageListContainer>
      <h3>이미지 List({isPublic ? "공개" : "개인"})사진 </h3>
      {me && (
        <button onClick={() => setIsPublic(!isPublic)}>
          {(isPublic ? "개인" : "공개") + "사진 보기"}
        </button>
      )}
      <ImageFiles className="image-files">{imgList}</ImageFiles>
    </ImageListContainer>
  );
};

const ImageListContainer = styled.div`
  h3 {
    display: inline-block;
    margin-right: 13px;
  }
`;

const ImageFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-around;

  img {
    width: 140px;
    height: 140px;
    object-fit: cover;

    &:hover {
      box-shadow: 4px 4px 4px grey;
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;
export default ImageList;

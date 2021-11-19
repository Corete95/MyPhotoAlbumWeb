import React, { useContext } from "react";
import { useParams } from "react-router";
import { ImageContext } from "../context/ImageContext";
import styled from "styled-components";

const ImagePage = () => {
  const { imageId } = useParams();
  const { images, myImages } = useContext(ImageContext);
  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => images._id === imageId);

  if (!image) return <h3>Loading...</h3>;

  return (
    <ImagePageContainer>
      <h3>이미지 페이지 -{imageId}</h3>
      <img alt={imageId} src={`http://localhost:5000/uploads/${image.key}`} />
    </ImagePageContainer>
  );
};

const ImagePageContainer = styled.div`
  margin-top: 150px;
  img {
    width: 100%;
  }
`;

export default ImagePage;

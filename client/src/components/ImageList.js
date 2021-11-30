import React, { useContext, useEffect, useCallback, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ImageContext } from "../context/ImageContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ImageList = () => {
  const {
    images,
    myImages,
    isPublic,
    setIsPublic,
    imageLoading,
    imageError,
    setImageUrl,
  } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const elementRef = useRef(null);

  const loaderMoreImages = useCallback(() => {
    if (images.length === 0 || imageLoading) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`${isPublic ? "" : "/users/me"}/images?lastid=${lastImageId}`);
  }, [images, imageLoading, isPublic, setImageUrl]);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      console.log("intersection", entry.isIntersecting);
      if (entry.isIntersecting) loaderMoreImages();
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [loaderMoreImages]);

  const imgList = images.map((image, index) => (
    <Link
      key={image.key}
      to={`/images/${image._id}`}
      ref={index + 1 === images.length ? elementRef : undefined}
    >
      <img alt="" src={`http://localhost:5000/uploads/${image.key}`} />
    </Link>
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
      {imageError && <div>Error...</div>}
      {imageLoading && <div>Loading...</div>}
    </ImageListContainer>
  );
};

const ImageListContainer = styled.div`
  margin-top: 40px;
  h3 {
    display: inline-block;
    margin-right: 13px;
  }
`;

const ImageFiles = styled.div`
  margin-top: 20px;
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
const Button = styled.button``;
export default ImageList;

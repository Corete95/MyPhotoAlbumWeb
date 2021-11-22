import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ImageContext } from "../context/ImageContext";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ImagePage = () => {
  const history = useHistory();
  const { imageId } = useParams();
  const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const [hasLiked, setHasLiked] = useState(false);

  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => image._id === imageId);

  const updateImage = (images, image) =>
    [...images.filter((image) => image._id !== imageId), image].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const deleteHandler = async () => {
    try {
      if (!window.confirm("정말 해당 이미지를 삭제하시겠습니까?")) return;
      const result = await axios.delete(`/images/${imageId}`);
      toast.success(result.data.message);
      setImages(images.filter((image) => image._id !== imageId));
      setMyImages(myImages.filter((image) => image._id !== imageId));
      history.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (me && image && image.likes.includes(me.userId)) setHasLiked(true);
  }, [me, image]);

  const onSubmit = async () => {
    const result = await axios.patch(
      `/images/${imageId}/${hasLiked ? "unlike" : "like"}`
    );
    if (result.data.public) setImages(updateImage(images, result.data));
    else setMyImages(updateImage(myImages, result.data));

    setHasLiked(!hasLiked);
  };

  if (!image) return <h3>Loading...</h3>;

  return (
    <ImagePageContainer>
      <h3>이미지 페이지 -{imageId}</h3>
      <img alt={imageId} src={`http://localhost:5000/uploads/${image.key}`} />
      <span>좋아요 {image.likes.length}</span>
      {me && image.user._id === me.userId && (
        <button onClick={deleteHandler}> 삭제</button>
      )}
      <button onClick={onSubmit}>{hasLiked ? "좋아요 취소" : "좋아요"}</button>
    </ImagePageContainer>
  );
};

const ImagePageContainer = styled.div`
  margin-top: 150px;
  img {
    width: 100%;
  }
  button {
    float: right;
    margin-left: 10px;
  }
`;

export default ImagePage;

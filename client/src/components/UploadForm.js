import React, { useState, useContext } from "react";
import aixos from "axios";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";
import styled, { css } from "styled-components";

const UploadForm = () => {
  const defaultFileName = "이미지 파일을 업로드 해주세요.";
  const { images, setImages, myImages, setMyImages } = useContext(ImageContext);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [precent, setPrecent] = useState(0);
  const [isPublic, setIsPublic] = useState(true);

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("public", isPublic);
    try {
      const res = await aixos.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setPrecent(Math.round(100 * e.loaded) / e.total);
        },
      });
      if (isPublic) setImages([...images, res.data]);
      else setMyImages([...myImages, res.data]);
      toast.success("이미지 업로드 성공!");
      setTimeout(() => {
        setPrecent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      setPrecent(0);
      setFileName(defaultFileName);
      setImgSrc(null);
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <ImgPreview alt="" show={imgSrc} src={imgSrc} />
      <ProgressBar precent={precent} />
      <FileDropper>
        {fileName}
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/gif  "
          onChange={imageSelectHandler}
        />
      </FileDropper>
      <input
        type="checkbox"
        id="public-check"
        value={!isPublic}
        onChange={() => setIsPublic(!isPublic)}
      />
      <label htmlFor="public-check">비공개</label>
      <Button type="submit">제출</Button>
    </form>
  );
};

const FileDropper = styled.div`
  border: 1px dashed black;
  height: 200px;
  background-color: #eeb977;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }

  &:hover {
    background-color: gray;
    color: white;
    transition: 0.5;
  }
`;

const ImgPreview = styled.img`
  width: 0%;
  opacity: 0;
  display: block;
  margin: 0 auto 20px auto;
  border-radius: 10px;
  border: 5px solid black;

  ${(props) =>
    props.show &&
    css`
      width: 30%;
      opacity: 1;
      transition: 0.5s;
    `}
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
`;

export default UploadForm;

import React, { useState, useContext } from "react";
import aixos from "axios";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";
import styled, { css } from "styled-components";

const UploadForm = () => {
  const { setImages, setMyImages } = useContext(ImageContext);
  const [files, setFiles] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [precent, setPrecent] = useState(0);
  const [isPublic, setIsPublic] = useState(true);

  const imageSelectHandler = async (e) => {
    const imageFiles = e.target.files;
    setFiles(imageFiles);

    const imagePreviews = await Promise.all(
      [...imageFiles].map(async (imageFile) => {
        return new Promise((resolve, reject) => {
          try {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = (e) =>
              resolve({ imgSrc: e.target.result, fileName: imageFile.name });
          } catch (err) {
            reject(err);
          }
        });
      })
    );

    setPreviews(imagePreviews);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of files) {
      formData.append("image", file);
    }
    formData.append("public", isPublic);
    try {
      const res = await aixos.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setPrecent(Math.round(100 * e.loaded) / e.total);
        },
      });
      if (isPublic) setImages((prevData) => [...res.data, ...prevData]);
      setMyImages((prevData) => [...res.data, ...prevData]);
      toast.success("이미지 업로드 성공!");
      setTimeout(() => {
        setPrecent(0);
        setPreviews([]);
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      setPrecent(0);
      setPreviews([]);
      console.log(err);
    }
  };

  const fileName =
    previews.length === 0
      ? "이미지 파일을 업로드 해주세요."
      : previews.reduce(
          (previous, current) => previous + `${current.fileName},`,
          ""
        );
  const previewImages = previews.map((preview, index) => (
    <ImgPreview key={index} src={preview.imgSrc} alt="" show={preview.imgSrc} />
  ));
  return (
    <form onSubmit={onSubmit}>
      <ImgPreviewDiv>{previewImages}</ImgPreviewDiv>
      <ProgressBar precent={precent} />
      <FileDropper>
        {fileName}
        <input
          id="image"
          type="file"
          multiple
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
  margin-bottom: 10px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  word-break: break-all;

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
const ImgPreviewDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  margin-top: 10px;
  cursor: pointer;
`;

export default UploadForm;

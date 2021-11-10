import React, { useState } from "react";
import aixos from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const defaultFileName = "이미지 파일을 업로드 해주세요.";
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [precent, setPrecent] = useState(0);

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
    try {
      const res = await aixos.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setPrecent(Math.round(100 * e.loaded) / e.total);
        },
      });
      console.log({ res });
      toast.success("이미지 업로드 성공!");
      setTimeout(() => {
        setPrecent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setPrecent(0);
      setFileName(defaultFileName);
      setImgSrc(null);
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <img
        className={`img-preview ${imgSrc && "img-preview-show"}`}
        src={imgSrc}
      />
      <ProgressBar precent={precent} />
      <div className="file-dropper">
        {fileName}
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/gif  "
          onChange={imageSelectHandler}
        />
      </div>
      <button className="submit-btn" type="submit">
        제출
      </button>
    </form>
  );
};

export default UploadForm;

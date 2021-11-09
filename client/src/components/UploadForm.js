import React, { useState } from "react";
import aixos from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요");

  const imageSelectHandler = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await aixos.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log({ res });
      alert("Success!!");
    } catch (err) {
      alert("Fail!!");
      console.log({ err });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={imageSelectHandler} />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
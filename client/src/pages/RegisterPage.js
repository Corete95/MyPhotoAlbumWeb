import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import styled from "styled-components";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [me, setMe] = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3)
        throw new Error("닉네임을 3자 이상으로 해주세요.");
      if (password.length < 6)
        throw new Error("비밀번호를 6자 이상으로 해주세요.");
      if (password !== passwordCheck)
        throw new Error("비밀번호가 틀려요. 다시 입력해주세요.");

      const result = await axios.post("/users/register", {
        name,
        username,
        password,
      });
      setMe({
        userId: result.data.userId,
        sessionId: result.data.sessionId,
        name: result.data.name,
      });
      history.push("/");
      toast.success("회원가입 완료!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <RegisterContainer>
      <h3>회원가입</h3>
      <form onSubmit={submitHandler}>
        <CustomInput label="이름" vlaue={name} setValue={setName} />
        <CustomInput label="닉네임" vlaue={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          vlaue={password}
          setValue={setPassword}
          type={"password"}
        />
        <CustomInput
          label="비밀번호 확인"
          vlaue={passwordCheck}
          setValue={setPasswordCheck}
          type={"password"}
        />
        <Button type="submit">회원가입</Button>
      </form>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  max-width: 350px;
  padding-top: 100px;
  margin: 0 auto;
`;

const Button = styled.button`
  margin-top: 20px;
`;

export default RegisterPage;

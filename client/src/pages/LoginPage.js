import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [me, setMe] = useContext(AuthContext);
  const history = useHistory();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3 || password.length < 6)
        throw new Error("입력하신 정보가 올바르지 않습니다.");
      const result = await axios.patch("/users/login", { username, password });
      setMe({
        name: result.data.name,
        sessionId: result.data.sessionId,
        userId: result.data.userId,
      });
      history.push("/");
      toast.success("로그인");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };
  return (
    <LoginContainer>
      <h3>로그인</h3>
      <form onSubmit={loginHandler}>
        <CustomInput label="회원ID" vlaue={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          vlaue={password}
          setValue={setPassword}
          type="password"
        />
        <Button type="submit">로그인</Button>
      </form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  max-width: 350px;
  margin: 0 auto;

  h3 {
    font-size: 20px;
    text-align: center;
    margin: 30px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
`;
export default LoginPage;

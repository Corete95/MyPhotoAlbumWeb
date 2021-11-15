import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import { AuthContext } from "../context/AuthContext";

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
    <div>
      <h3>Login</h3>
      <form onSubmit={loginHandler}>
        <CustomInput label="회원ID" vlaue={username} setValue={setUsername} />
        <CustomInput
          label="비밀번호"
          vlaue={password}
          setValue={setPassword}
          type="password"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;

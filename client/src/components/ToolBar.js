import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import styled, { css } from "styled-components";

const ToolBar = () => {
  const [me, setMe] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      await axios.patch("/users/logout");
      setMe();
      toast.success("로그아웃!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <span className="home">홈</span>
      </Link>
      {me ? (
        <Span onClick={logoutHandler} className="logout">
          로그아웃({me.name})
        </Span>
      ) : (
        <>
          <Link to="/auth/login">
            <Span className="login">로그인</Span>
          </Link>
          <Link to="/auth/register">
            <Span register>회원가입</Span>
          </Link>
        </>
      )}
    </div>
  );
};

const Span = styled.span`
  float: right;
  cursor: pointer;

  ${(props) =>
    props.register &&
    css`
      margin-right: 15px;
    `}
`;

export default ToolBar;

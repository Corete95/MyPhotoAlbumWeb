import React from "react";
import { Link } from "react-router-dom";
import "../components/ToolBar.css";

const ToolBar = () => {
  return (
    <div>
      <Link to="/">
        <span className="home">홈</span>
      </Link>
      <Link to="/auth/login">
        <span className="login">로그인</span>
      </Link>
      <Link to="/auth/register">
        <span className="register">회원가입</span>
      </Link>
    </div>
  );
};

export default ToolBar;

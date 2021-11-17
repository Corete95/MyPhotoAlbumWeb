import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../components/ToolBar.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

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
        <span onClick={logoutHandler} className="logout">
          로그아웃({me.name})
        </span>
      ) : (
        <>
          <Link to="/auth/login">
            <span className="login">로그인</span>
          </Link>
          <Link to="/auth/register">
            <span className="register">회원가입</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default ToolBar;

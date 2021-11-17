import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import ToolBar from "./components/ToolBar";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <ToastContainer />
        <ToolBar />
        <Switch>
          <Route path="/auth/register" exact component={RegisterPage} />
          <Route path="/auth/login" exact component={LoginPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
    </>
  );
};

export default App;

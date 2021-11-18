import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import ToolBar from "./components/ToolBar";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <Container>
        <ToastContainer />
        <ToolBar />
        <Switch>
          <Route path="/auth/register" exact component={RegisterPage} />
          <Route path="/auth/login" exact component={LoginPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

export default App;

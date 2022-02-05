import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./Auth.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

function Auth() {
  let { type } = useParams();
  return (
    <div className="pt-20 auth">
      {type === "login" ? <Login /> : <SignUp />}
    </div>
  );
}

export default Auth;

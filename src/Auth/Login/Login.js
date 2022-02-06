import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  username = "";
  password = "";

  usernameChange(event) {
    this.username = event.target.value;
  }
  passwordChange(event) {
    this.password = event.target.value;
  }

  loginHandler(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/users/login`, {
        data: {
          username: this.username,
          password: this.password,
        },
      })
      .then((resData) => {
        if (resData.data) {
          localStorage.setItem("currentUser", resData.data.accessToken);
          window.location.href = "/";
        } else {
          alert("The typed credentials are wrong");
        }
      });
  }

  render() {
    return (
      <div className="login">
        <h1 className="text-7xl mt-20 mb-7 text-center font-bold">Login</h1>
        <form onSubmit={this.loginHandler.bind(this)}>
          <input
            className="form-control"
            type={"text"}
            defaultValue={this.username}
            onChange={this.usernameChange.bind(this)}
            placeholder="Username"
            required
          />
          <input
            className="form-control"
            type={"password"}
            defaultValue={this.username}
            onChange={this.passwordChange.bind(this)}
            placeholder="Password"
            required
          />
          <p className="mb-2 text-center">
            Don't have a account ?{" "}
            <Link to={"/auth/signUp"}>
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </Link>
          </p>
          <button className="btn submit-button-form" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

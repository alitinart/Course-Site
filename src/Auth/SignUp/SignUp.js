import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  username = "";
  password = "";
  retypedPassword = "";

  usernameChange(event) {
    this.username = event.target.value;
  }
  passwordChange(event) {
    this.password = event.target.value;
  }
  retypeChange(event) {
    this.retypedPassword = event.target.value;
  }

  signUpHandler(event) {
    event.preventDefault();

    if (this.retypedPassword === this.password) {
      axios
        .post("http://localhost:8000/users", {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .then((resData) => {
          if (resData.data === "User with that username already exists") {
            alert("User with that username already exists");
          } else {
            window.location.href = "/auth/login";
          }
        });
    } else {
      alert("Password's don't match");
    }
  }

  render() {
    return (
      <div className="signUp">
        <h1 className="text-7xl mt-20 mb-7 text-center font-bold">Sign Up</h1>
        <form onSubmit={this.signUpHandler.bind(this)}>
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
            defaultValue={this.password}
            onChange={this.passwordChange.bind(this)}
            placeholder="Password"
            required
          />
          <input
            className="form-control"
            type={"password"}
            defaultValue={this.retypedPassword}
            onChange={this.retypeChange.bind(this)}
            placeholder="Retype Password"
            required
          />
          <p className="mb-2 text-center">
            Don't have a account ?{" "}
            <Link to={"/auth/login"}>
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

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
    axios.get(`http://localhost:8000/users/${this.username}`).then((user) => {
      let getUser = user.data.filter((userData) => {
        if (userData.userName === this.username) {
          return userData;
        }
      });
      if (getUser.length > 0) {
        if (getUser[0].password === this.password) {
          localStorage.setItem("currentUser", JSON.stringify(getUser[0]));
          window.location.href = "/";
        } else {
          alert("Password's don't match");
        }
      } else {
        alert("No user found with that username");
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

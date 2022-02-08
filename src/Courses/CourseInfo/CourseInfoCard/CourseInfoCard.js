import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseInfoCard.css";

export default class CourseInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseInfo: {},
      user: null,
      userObject: null,
      admin: false,
    };
  }

  componentDidMount() {
    this.requestHandler().then((course) => {
      let currentUser = localStorage.getItem("currentUser");
      this.setState({
        courseInfo: { ...course.data },
        user: currentUser,
      });
      this.adminHandler(currentUser).then((resData) => {
        this.userHandler().then((user) => {
          if (resData.data === "True") {
            this.setState((prevState) => {
              return {
                ...prevState,
                admin: true,
                userObject: user.data,
              };
            });
          } else {
            this.setState((prevState) => {
              return { ...prevState, userObject: user.data };
            });
          }
        });
      });
    });
  }

  async requestHandler() {
    const res = await axios.get(
      `http://localhost:8000/course/${this.props.productId}`
    );

    return res;
  }

  async userHandler() {
    const res = await axios.get(`http://localhost:8000/user/`, {
      headers: {
        authorization: `Bearer ${this.state.user}`,
      },
    });

    return res;
  }

  async adminHandler(user) {
    const res = await axios.get(`http://localhost:8000/users/admin/`, {
      headers: {
        authorization: `Bearer ${user}`,
      },
    });

    return res;
  }

  deleteHandler(courseId) {
    axios.delete(`http://localhost:8000/course/${courseId}`);
    window.location.href = "/";
  }

  render() {
    return this.state.courseInfo ? (
      <div className="course-info">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 ml-10 mr-10">
          <div className="grid-item image-info">
            <img src={this.state.courseInfo.image} />
          </div>
          <div className="grid-item product-info">
            <h1 className="product-title">{this.state.courseInfo.title}</h1>
            <p className="product-desc">{this.state.courseInfo.desc}</p>
            {this.state.userObject &&
            this.state.userObject.courses.includes(
              this.state.courseInfo.title
            ) ? (
              <Link
                to={"/course/videos/" + this.state.courseInfo._id}
                className="btn text-center product-button"
              >
                <button className="text-center">Watch Course</button>
              </Link>
            ) : (
              <Link to={"/checkout/" + this.state.courseInfo._id}>
                <button className="btn product-button">Buy Now</button>
              </Link>
            )}
            <p className="product-price">
              Price: {this.state.courseInfo.price}$
            </p>
            {this.state.admin ? (
              <button
                className="btn"
                onClick={this.deleteHandler.bind(
                  this,
                  this.state.courseInfo._id
                )}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

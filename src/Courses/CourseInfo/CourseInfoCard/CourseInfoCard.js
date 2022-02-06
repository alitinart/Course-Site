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
      admin: false,
    };
  }

  componentDidMount() {
    this.requestHandler().then((course) => {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.setState({
        courseInfo: { ...course.data[0] },
        user: currentUser,
      });
      this.adminHandler(currentUser._id).then((resData) => {
        if (resData.data === "True") {
          this.setState((prevState) => {
            return {
              ...prevState,
              admin: true,
            };
          });
        }
      });
    });
  }

  async requestHandler() {
    const res = await axios.get(
      `http://localhost:8000/course/${this.props.productId}`
    );

    return res;
  }

  async adminHandler(userId) {
    const res = await axios.get(`http://localhost:8000/users/admin/${userId}`);

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
            <Link to={"/checkout/" + this.state.courseInfo._id}>
              <button className="btn product-button">Buy Now</button>
            </Link>
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

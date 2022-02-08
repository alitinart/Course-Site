import React, { Component } from "react";
import axios from "axios";

export default class AddVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      name: "",
    };
  }

  title = "";
  desc = "";
  link = "";
  image = "";
  courseId = "";

  onChangeTitle(event) {
    this.title = event.target.value;
  }

  onChangeDesc(event) {
    this.desc = event.target.value;
  }

  onChangeLink(event) {
    this.link = event.target.value;
  }

  onChangeCourseID(event) {
    this.courseId = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/course/${this.courseId}`, {
        data: {
          title: this.title,
          desc: this.desc,
          link: this.link,
        },
      })
      .then((resData) => {
        window.location.href = "/";
      });
  }

  render() {
    return (
      <div className="add-course">
        <h1 className="text-7xl mt-20 mb-7 text-center font-bold">
          Add Videos
        </h1>
        <form onSubmit={this.onSubmit.bind(this)} className="course-form">
          <input
            type={"text"}
            defaultValue={this.title}
            onChange={this.onChangeTitle.bind(this)}
            placeholder="Video Title"
            className="form-control"
            required
          />
          <textarea
            type={"text"}
            defaultValue={this.desc}
            onChange={this.onChangeDesc.bind(this)}
            placeholder="Video Description"
            className="form-control"
            rows={"5"}
            required
          ></textarea>
          <input
            type={"text"}
            defaultValue={this.link}
            onChange={this.onChangeLink.bind(this)}
            placeholder="Video Link"
            className="form-control"
            required
          />
          <input
            type={"text"}
            defaultValue={this.courseId}
            onChange={this.onChangeCourseID.bind(this)}
            placeholder="Course Id"
            className="form-control"
            required
          />
          <button type="submit" className="btn submit-button-form mt-5">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

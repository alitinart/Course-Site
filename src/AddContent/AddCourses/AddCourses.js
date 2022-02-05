import React, { Component } from "react";

export default class AddCourses extends Component {
  title = "";
  desc = "";
  price = "";

  onChangeTitle(event) {
    this.title = event.target.value;
  }
  onChangeDesc(event) {
    this.desc = event.target.value;
  }
  onChangePrice(event) {
    this.price = event.target.value;
  }

  render() {
    return (
      <div className="add-course">
        <h1 className="text-7xl mt-20 mb-7 text-center font-bold">
          Add Course
        </h1>
        <form className="course-form">
          <input
            type={"text"}
            defaultValue={this.title}
            onChange={this.onChangeTitle.bind(this)}
            placeholder="Course Title"
            className="form-control"
          />
          <textarea
            type={"text"}
            defaultValue={this.desc}
            onChange={this.onChangeDesc.bind(this)}
            placeholder="Course Description"
            className="form-control"
            rows={"5"}
          ></textarea>
          <input
            type={"text"}
            defaultValue={this.price}
            onChange={this.onChangePrice.bind(this)}
            placeholder="Course Price"
            className="form-control"
          />
          <button className="btn submit-button-form">Submit</button>
        </form>
      </div>
    );
  }
}

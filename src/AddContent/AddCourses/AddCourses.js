import axios from "axios";
import React, { Component } from "react";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
export default class AddCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      name: "",
    };
  }

  title = "";
  desc = "";
  price = "";
  image = "";

  onChangeTitle(event) {
    this.title = event.target.value;
  }

  onChangeDesc(event) {
    this.desc = event.target.value;
  }

  onChangePrice(event) {
    this.price = event.target.value;
  }

  onImageAdded(file) {
    this.setState((prevState) => {
      return { ...prevState, name: file.name };
    });
    if (!file) {
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      this.image = dataUri;
      console.log(this.image);
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/course", {
        data: {
          title: this.title,
          desc: this.desc,
          price: this.price,
          tags: this.state.tags,
          image: this.image,
        },
      })
      .then((resData) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="add-course">
        <h1 className="text-7xl mt-20 mb-7 text-center font-bold">
          Add Course
        </h1>
        <form onSubmit={this.onSubmit.bind(this)} className="course-form">
          <input
            type={"text"}
            defaultValue={this.title}
            onChange={this.onChangeTitle.bind(this)}
            placeholder="Course Title"
            className="form-control"
            required
          />
          <textarea
            type={"text"}
            defaultValue={this.desc}
            onChange={this.onChangeDesc.bind(this)}
            placeholder="Course Description"
            className="form-control"
            rows={"5"}
            required
          ></textarea>
          <label htmlFor="file-upload" className="custom-file-upload">
            {this.state.name ? this.state.name : "Upload Thumbnail"}
          </label>
          <input
            type={"file"}
            defaultValue={this.price}
            onChange={(event) => this.onImageAdded(event.target.files[0])}
            className="form-control"
            id="file-upload"
            required
          />
          <input
            type={"number"}
            defaultValue={this.price}
            onChange={this.onChangePrice.bind(this)}
            placeholder="Course Price"
            className="form-control"
            required
          />
          <ReactTagInput
            tags={this.state.tags}
            placeholder="Tags"
            onChange={(newTags) => this.setState({ tags: newTags })}
          />
          <button type="submit" className="btn submit-button-form mt-5">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

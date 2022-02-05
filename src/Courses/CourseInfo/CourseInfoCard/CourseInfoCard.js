import axios from "axios";
import React, { Component } from "react";
import "./CourseInfoCard.css";

export default class CourseInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseInfo: {},
    };
  }

  componentDidMount() {
    this.requestHandler().then((course) => {
      this.setState({
        courseInfo: { ...course.data[0] },
      });
    });
  }

  async requestHandler() {
    const res = await axios.get(
      `http://localhost:8000/course/${this.props.productId}`
    );

    return res;
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
            <button className="btn product-button">Buy Now</button>
            <p className="product-price">
              Price: {this.state.courseInfo.price}$
            </p>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

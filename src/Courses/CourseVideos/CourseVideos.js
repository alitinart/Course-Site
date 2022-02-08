import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CourseVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: null,
    };
  }

  componentDidMount() {
    this.requestHandler().then((course) => {
      this.setState({
        course: course.data,
      });
    });
  }

  async requestHandler() {
    const res = axios.get(`http://localhost:8000/course/${this.props.id}`);

    return res;
  }

  render() {
    return this.state.course ? (
      <div className="pt-20 mt-20 pl-5 pr-5">
        <div className="course-video-info">
          <img src={this.state.course.image} className="w-80 " />
          <h1 className="mt-10 text-center font-bold text-5xl">
            {this.state.course.title}
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {this.state.course.videos.map((video, index) => {
            return (
              <div className="video-card">
                <iframe
                  src={video.link}
                  width="100%"
                  height="360px"
                  className="rounded-md"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h1 className="font-bold text-5xl">{video.title}</h1>
                <h1 className="mt-3 mb-3">{video.desc}</h1>
                <Link className="btn" to={"./" + index}>
                  <button>Watch</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

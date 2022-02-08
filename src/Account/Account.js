import axios from "axios";
import React, { Component } from "react";
import CourseCard from "../Courses/CourseCard/CourseCard";
import "./Account.css";

export default class Account extends Component {
  user = localStorage.getItem("currentUser");

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      courses: null,
    };
  }

  componentDidMount() {
    this.requestHandler().then((userObject) => {
      this.getCourses().then((courses) => {
        let findCourses = courses.data.filter((course) => {
          if (userObject.data.courses.includes(course.title)) {
            return course;
          }
        });
        console.log(userObject.data);
        this.setState({
          user: userObject.data,
          courses: findCourses,
        });
      });
    });
  }

  async requestHandler() {
    const res = axios.get("http://localhost:8000/user/find", {
      headers: {
        authorization: `Bearer ${this.user}`,
      },
    });

    return res;
  }

  async getCourses() {
    const res = axios.get("http://localhost:8000/course");

    return res;
  }

  render() {
    return this.state.user !== null ? (
      <div className="account text-center pl-5 pt-20 mt-20 pr-10">
        <div className="user-info">
          <h1 className="font-bold text-5xl">{this.state.user.userName}</h1>
        </div>
        {this.state.user.courses.length <= 0 ? (
          <div className="no-courses h-screen">
            <h1 className="text-center mt-5 text-4xl font-bold">
              No Courses Purchased
            </h1>
          </div>
        ) : (
          <div className="courses">
            <h5 className="font-bold text-center text-3xl mt-5">
              Your purchased courses
            </h5>
            <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {this.state.courses.length > 0 ? (
                this.state.courses.map((course) => {
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      id={course._id}
                      key={course._id}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    ) : (
      <></>
    );
  }
}

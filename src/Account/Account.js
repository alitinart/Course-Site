import React, { Component } from "react";
import CourseCard from "../Courses/CourseCard/CourseCard";
import "./Account.css";

export default class Account extends Component {
  user = JSON.parse(localStorage.getItem("currentUser"));

  render() {
    return (
      <div className="account pt-20 mt-20 pl-5 pr-10">
        <div className="user-info">
          <h1 className="font-bold text-5xl">{this.user.userName}</h1>
        </div>
        <div className="courses">
          <p className="font-bold text-2xl">Your Courses</p>
          <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-1">
            {this.user.courses.map((course) => {
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
            })}
          </div>
        </div>
      </div>
    );
  }
}
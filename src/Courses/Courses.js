import React, { Component } from "react";
import CourseCard from "./CourseCard/CourseCard";
import axios from "axios";

export default class Courses extends Component {
  counter = 0;
  projectCounter = 0;
  modernCounter = 0;
  beginnerCounter = 0;

  constructor(props) {
    super(props);

    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    this.requestHandler().then((resData) => {
      this.setState({
        courses: [...resData.data],
      });
    });
  }

  async requestHandler() {
    const res = await axios.get("http://localhost:8000/course");
    return res;
  }

  render() {
    return (
      <div>
        <section className="courses mb-20 pl-10 pr-10" id="courses">
          <h1 className="text-7xl mt-20 mb-20 text-center font-bold">
            Newest Courses
          </h1>
          {this.state.courses.length < 0 ? (
            <div className="loader"></div>
          ) : (
            <></>
          )}
          <div className="course-list grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {this.state.courses.length > 0 ? (
              this.state.courses.map((course) => {
                if (this.counter < 3) {
                  this.counter++;
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      id={course._id}
                      key={course._id}
                    ></CourseCard>
                  );
                } else {
                  return;
                }
              })
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="courses mb-20 pl-10 pr-10" id="courses">
          <h1 className="text-7xl mt-20 mb-5 text-center font-bold">
            Learn By Doing
          </h1>
          <p className="text-xl text-center mb-5">Make your own projects 📽️</p>
          {this.state.courses.length < 0 ? (
            <div className="loader"></div>
          ) : (
            <></>
          )}
          <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
            {this.state.courses.length > 0 ? (
              this.state.courses.map((course) => {
                if (
                  course.tags.includes("Project Based") &&
                  this.projectCounter < 2
                ) {
                  this.projectCounter++;
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      key={course._id + " Project"}
                      id={course._id}
                    ></CourseCard>
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="courses mb-20 pl-10 pr-10" id="courses">
          <h1 className="text-7xl mt-20 mb-5 text-center font-bold">
            Modern Fullstack
          </h1>
          <p className="text-xl text-center mb-20">Stick with time ⏱️</p>
          {this.state.courses.length < 0 ? (
            <div className="loader"></div>
          ) : (
            <></>
          )}
          <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
            {this.state.courses.length > 0 ? (
              this.state.courses.map((course) => {
                if (course.tags.includes("Modern") && this.modernCounter < 2) {
                  this.modernCounter++;
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      key={course._id + " Modern"}
                      id={course._id}
                    ></CourseCard>
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="courses mb-20 pl-10 pr-10" id="courses">
          <h1 className="text-5xl mt-20 mb-5 text-center font-bold">
            New to development
          </h1>
          <p className="text-xl text-center mb-20">Learn the basics first 👇</p>
          {this.state.courses.length < 0 ? (
            <div className="loader"></div>
          ) : (
            <></>
          )}
          <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
            {this.state.courses.length > 0 ? (
              this.state.courses.map((course) => {
                if (
                  course.tags.includes("Beginner") &&
                  this.beginnerCounter < 2
                ) {
                  this.beginnerCounter++;
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      key={course._id + " Beginner"}
                      id={course._id}
                    ></CourseCard>
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    );
  }
}

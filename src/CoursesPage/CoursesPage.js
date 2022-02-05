import axios from "axios";
import React, { Component } from "react";
import CourseCard from "../Home/Courses/CourseCard/CourseCard";
import Filter from "./Filter/Filter";

export default class CoursesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      filter: "",
    };

    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.requestHandler().then((courses) => {
      this.setState({
        courses: [...courses.data],
      });
    });
  }

  async requestHandler() {
    const res = await axios.get("http://localhost:8000/course");

    return res;
  }

  filter(fitlerValue) {
    this.setState((prevState) => {
      return {
        ...prevState,
        filter: fitlerValue,
      };
    });
  }

  render() {
    return (
      <div className="pt-20 pb-20">
        <h1 className="text-7xl mt-20 pb-5 mb-5 text-center font-bold">
          Courses
        </h1>
        <Filter filter={this.filter}></Filter>
        {this.state.courses.length < 0 ? <div className="loader"></div> : <></>}
        <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-1">
          {this.state.courses.length > 0 ? (
            this.state.courses.map((course) => {
              switch (this.state.filter) {
                case "":
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      key={course._id}
                    ></CourseCard>
                  );
                case "Project Based":
                  if (course.tags.includes("Project Based")) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                      ></CourseCard>
                    );
                  }
                  break;
                case "Beginner":
                  if (course.tags.includes("Beginner")) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                      ></CourseCard>
                    );
                  }
                  break;
                case "Modern":
                  if (course.tags.includes("Modern")) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                      ></CourseCard>
                    );
                  }
                  break;
                case "All":
                  return (
                    <CourseCard
                      image={course.image}
                      title={course.title}
                      description={course.desc}
                      tags={[...course.tags]}
                      key={course._id}
                    ></CourseCard>
                  );
                  break;
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

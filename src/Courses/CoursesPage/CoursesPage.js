import axios from "axios";
import React, { Component } from "react";
import CourseCard from "../CourseCard/CourseCard";
import Filter from "./Filter/Filter";
import Search from "./Search/Search";

export default class CoursesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      filter: "",
      search: "",
    };

    this.filter = this.filter.bind(this);
    this.search = this.search.bind(this);
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

  search(searchValue) {
    this.setState((prevState) => {
      return {
        ...prevState,
        search: searchValue,
      };
    });
  }

  render() {
    return (
      <div className="pt-20 pb-20">
        <h1 className="text-7xl mt-20 pb-5 mb-5 text-center font-bold">
          Courses
        </h1>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          <Filter filter={this.filter}></Filter>
          <Search search={this.search} />
        </div>
        {this.state.courses.length < 0 ? <div className="loader"></div> : <></>}
        <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-1">
          {this.state.courses.length > 0 ? (
            this.state.courses.map((course) => {
              switch (this.state.filter) {
                case "":
                  if (
                    course.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  ) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        id={course._id}
                        tags={[...course.tags]}
                        key={course._id}
                      ></CourseCard>
                    );
                  }
                case "Project Based":
                  if (
                    course.tags.includes("Project Based") &&
                    course.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  ) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                        id={course._id}
                      ></CourseCard>
                    );
                  }
                  break;
                case "Beginner":
                  if (
                    course.tags.includes("Beginner") &&
                    course.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  ) {
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
                  }
                  break;
                case "Modern":
                  if (
                    course.tags.includes("Modern") &&
                    course.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  ) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                        id={course._id}
                      ></CourseCard>
                    );
                  }
                  break;
                case "All":
                  if (
                    course.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  ) {
                    return (
                      <CourseCard
                        image={course.image}
                        title={course.title}
                        description={course.desc}
                        tags={[...course.tags]}
                        key={course._id}
                        id={course._id}
                      ></CourseCard>
                    );
                  }
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

import React from "react";
import CourseCard from "./CourseCard/CourseCard";
import Angular from "../../Assets/Images/Angular.png";
import ReactImage from "../../Assets/Images/React.png";
import Vue from "../../Assets/Images/Vue.png";

function Courses() {
  return (
    <div>
      <section className="courses mb-20 pl-10 pr-10" id="courses">
        <h1 className="text-7xl mt-20 mb-20 text-center font-bold">
          Newest Courses
        </h1>

        <div className="course-list grid md:grid-cols-3 sm:grid-cols-1">
          <CourseCard
            image={Angular}
            title="Angular Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
          <CourseCard
            image={ReactImage}
            title="React Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
          <CourseCard
            image={Vue}
            title="Vue Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
        </div>
      </section>
      <section className="courses mb-20 pl-10 pr-10" id="courses">
        <h1 className="text-7xl mt-20 mb-5 text-center font-bold">
          Learn By Doing
        </h1>
        <p className="text-xl text-center mb-5">Make your own projects 📽️</p>
        <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
          <CourseCard
            image={Angular}
            title="Angular Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
          <CourseCard
            image={ReactImage}
            title="React Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
        </div>
      </section>
      <section className="courses mb-20 pl-10 pr-10" id="courses">
        <h1 className="text-7xl mt-20 mb-5 text-center font-bold">
          Modern Fullstack
        </h1>
        <p className="text-xl text-center mb-20">Stick with time ⏱️</p>
        <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
          <CourseCard
            image={Angular}
            title="Angular Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
          <CourseCard
            image={ReactImage}
            title="React Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
        </div>
      </section>
      <section className="courses mb-20 pl-10 pr-10" id="courses">
        <h1 className="text-5xl mt-20 mb-5 text-center font-bold">
          New to development
        </h1>
        <p className="text-xl text-center mb-20">Learn the basics first 👇</p>
        <div className="course-list grid md:grid-cols-2 sm:grid-cols-1">
          <CourseCard
            image={Angular}
            title="Angular Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
          <CourseCard
            image={ReactImage}
            title="React Full Course"
            description={
              '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
            }
          ></CourseCard>
        </div>
      </section>
    </div>
  );
}

export default Courses;

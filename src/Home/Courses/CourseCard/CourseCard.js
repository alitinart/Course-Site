import React from "react";
import "./CourseCard.css";

function CourseCard(props) {
  return (
    <div className="course-card mt-5">
      <img src={props.image} className="block m-auto" />
      <h1 className="course-title">{props.title}</h1>
      <p className="course-desc">{props.description}</p>
      <button className="submit-button">Start</button>
    </div>
  );
}

export default CourseCard;

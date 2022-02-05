import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard(props) {
  return (
    <Link to={"/courses/" + props.id} className="course-card mt-5">
      <img src={props.image} className="block m-auto" />
      <h1 className="course-title">{props.title}</h1>
      <p className="course-desc">{props.description}</p>
      <div className="course-tags">
        {props.tags.map((tag) => {
          return <p>{tag}</p>;
        })}
      </div>
      <button className="submit-button">Start</button>
    </Link>
  );
}

export default CourseCard;

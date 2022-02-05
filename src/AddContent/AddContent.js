import React from "react";
import { useParams } from "react-router-dom";
import AddCourses from "./AddCourses/AddCourses";
import AddVideos from "./AddVideos/AddVideos";
import "./AddContent.css";

export default function AddContent() {
  let { type } = useParams();

  return (
    <div className="addContent">
      {type == "addCourses" ? (
        <AddCourses />
      ) : type == "addVideos" ? (
        <AddVideos />
      ) : (
        (window.location.href = "/")
      )}
    </div>
  );
}

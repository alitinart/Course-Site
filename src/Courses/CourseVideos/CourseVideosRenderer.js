import React from "react";
import { useParams } from "react-router-dom";
import CourseVideos from "./CourseVideos";

export default function CourseVideoRenderer() {
  const { id } = useParams();

  return <CourseVideos id={id} />;
}

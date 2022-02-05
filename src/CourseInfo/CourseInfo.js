import React from "react";
import { useParams } from "react-router-dom";
import CourseInfoCard from "./CourseCard/CourseInfoCard";

export default function CourseInfo() {
  window.scrollTo(0, 0);

  const { courseId } = useParams();
  return (
    <div className="pt-20">
      <CourseInfoCard productId={courseId} />
    </div>
  );
}

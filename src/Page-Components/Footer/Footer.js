import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  let user = localStorage.getItem("currentUser");
  const [admin, setAdmin] = useState(false);

  if (user) {
    axios
      .get(`http://localhost:8000/users/admin/`, {
        headers: {
          authorization: `Bearer ${user}`,
        },
      })
      .then((resData) => {
        if (resData.data === "True") {
          setAdmin(true);
        }
      });
  }

  return (
    <div className="footer">
      <p className="pb-3">
        Find a issue with this page ?{" "}
        <a href="https://github.com" className="text-blue-700">
          Fix it on Github
        </a>
      </p>
      <div className="copyright">
        <p>Copyright © 2022 Nart Aliti ™</p>
        <p>Created with ReactJS</p>
      </div>
      <p className="mt-2">Home Courses Your Courses</p>
      {admin ? (
        <div>
          <Link to={"/addContent/addCourses"}>
            <button className="btn mt-5">Add Course</button>
          </Link>
          <Link to={"/addContent/addVideos"}>
            <button className="btn mt-5 ml-5">Add Video</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Footer;

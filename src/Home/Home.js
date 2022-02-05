import React from "react";
import AboutMe from "./About-Me/AboutMe";
import Courses from "./Courses/Courses";
import Customers from "./Customers/Customers";
import Hero from "./Hero/Hero";

function Home() {
  return (
    <div className="Home">
      <Hero />
      <Courses />
      <AboutMe />
      <Customers />
    </div>
  );
}

export default Home;

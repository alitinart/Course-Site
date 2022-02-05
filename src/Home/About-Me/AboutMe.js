import React from "react";
import "./AboutMe.css";
import Github from "../../Assets/Images/Component.png";
import Logo from "../../Assets/Images/Logo@2x.png";

function AboutMe() {
  return (
    <section className="About-Me md:pl-20 md:pr-20 sm:pl-5 sm:pr-5">
      <h1 className="text-7xl mt-20 mb-5 text-center font-bold">About Me</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1">
        <div className="about-me-text">
          <p className="about-text font-bold text-2xl sm:text-center md:text-left">
            Hi there, 👋
            <br />
            My name is Nart. I am a Self taught Web Developer
            <br />
            looking to teach others about the wonders of
            <br />
            programing 🧑‍💻
            <br />
            I created this website for a easy and cheap way for
            <br />
            people to learn web development.
            <br />
            <br />
            Now you might ask, why me 🤔
            <br />
            Well ...
            <br />
          </p>
        </div>
        <div className="socials mt-20">
          <div className="github mb-10 grid md:grid-cols-2 sm:grid-cols-1 ">
            <img
              src={Github}
              className="h-50 w-auto inline-block ml-auto mr-auto"
            />
            <div className="socials-content md:text-left sm:text-center">
              <p className="font-bold text-2xl mb-2 mt-5">
                Checkout my Github !
              </p>
              <a href="https://github.com/alitinart">
                <button className="btn">Check it out</button>
              </a>
            </div>
          </div>
          <div className="portfolio grid md:grid-cols-2 sm:grid-cols-1  ">
            <img
              src={Logo}
              className="h-50 w-auto inline-block ml-auto mr-auto"
            />
            <div className="socials-content md:text-left sm:text-center">
              <p className="font-bold text-2xl mb-2 mt-5">
                Checkout my Portfolio !
              </p>
              <a href="https://nartaliti.me">
                <button className="btn">Check it out</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

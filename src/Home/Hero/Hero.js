import React from "react";
import codeImage from "../../Assets/Images/code.png";
import "./Hero.css";

function Hero() {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 Hero">
      <div className="hero-text md:text-right text-center mb-5">
        <h1 className="text-7xl font-bold mb-5">Welcome 👋</h1>
        <p className="text-3xl italic font-thin">
          " You're not born a programmer...
          <br />
          You become one " - Nart Aliti
        </p>
        <a href="#courses">
          <button className="btn hero-button mt-5 mb-5">Start Learning</button>
        </a>
      </div>
      <div className="hero-image">
        <img className="hero-img" src={codeImage} />
      </div>
    </div>
  );
}

export default Hero;

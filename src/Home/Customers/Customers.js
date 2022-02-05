import React, { Component } from "react";
import CustomerFeedback from "./CustomerFeedback/CustomerFeedback";
import instagram from "../../Assets/Images/instagram.png";
import github from "../../Assets/Images/github.png";
import twitter from "../../Assets/Images/twitter.png";
import "./Customers.css";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbacks: [
        {
          name: "Gent Aliti",
          socialImage: github,
          social: "@alitigent",
          message:
            "I am a developer today 🧑‍💻, it's because of @alitinart tutorial videos on his website 👍",
          image: "https://avatars.githubusercontent.com/u/16125452?v=4",
        },
        {
          name: "Gent Aliti",
          socialImage: github,
          social: "@alitigent",
          message:
            "I am a developer today 🧑‍💻, it's because of @alitinart tutorial videos on his website 👍",
          image: "https://avatars.githubusercontent.com/u/16125452?v=4",
        },
        {
          name: "Gent Aliti",
          socialImage: github,
          social: "@alitigent",
          message:
            "I am a developer today 🧑‍💻, it's because of @alitinart tutorial videos on his website 👍",
          image: "https://avatars.githubusercontent.com/u/16125452?v=4",
        },
        {
          name: "Gent Aliti",
          socialImage: github,
          social: "@alitigent",
          message:
            "I am a developer today 🧑‍💻, it's because of @alitinart tutorial videos on his website 👍",
          image: "https://avatars.githubusercontent.com/u/16125452?v=4",
        },
      ],
    };
  }

  render() {
    return (
      <section className="testimonies">
        <h1 className="text-6xl mt-20 mb-5 text-center font-bold section-header">
          Happy Developers
        </h1>
        <div className="Customers mt-20">
          <div className="grid md:grid-cols-4 sm:grid-cols-1 feedbacks">
            {this.state.feedbacks.map((feedback) => {
              return (
                <CustomerFeedback
                  name={feedback.name}
                  image={feedback.image}
                  socialImage={feedback.socialImage}
                  social={feedback.social}
                  message={feedback.message}
                  key={feedback.social}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Customers;

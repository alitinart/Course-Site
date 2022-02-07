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
          name: "Lir Zeka",
          socialImage: instagram,
          social: "@lirzeka",
          message:
            "@alitinart <- This guys website is the best way to learn programing. Go check it out ! 🔥",
          image:
            "https://mir-s3-cdn-cf.behance.net/user/115/6ef259610890009.612debe74a8f9.jpg",
        },
        {
          name: "Jon Maloku",
          socialImage: twitter,
          social: "@jonmaloku",
          message:
            "Legit just built my first app using the help of @alitinart. Keep up the great work ! 🖥️",
          image:
            "https://i.ibb.co/b6zhJ2H/jonnmaloku-273012402-138078362005994-7211568183174230705-n.jpg",
        },
        {
          name: "Art Krasniqi",
          socialImage: instagram,
          social: "@a11111k",
          message:
            "I am a developer today 🧑‍💻, it's because of @alitinart tutorial videos on his website 👍",
          image:
            "https://i.ibb.co/JnZmC8q/a111111111kk-272780961-900116397341771-2362799129062835441-n-1.jpg",
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

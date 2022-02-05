import React from "react";
import "./CustomerFeedback.css";

function CustomerFeedback(props) {
  return (
    <div className="feedback">
      <div className="customer-info mb-7">
        <img className="avatar" src={props.image} />
        <div className="info">
          <p className="name">{props.name}</p>
          <p className="social">{props.social} </p>
          <img className="socialImage" src={props.socialImage} />
        </div>
      </div>
      <div className="feedback-content text-xl font-bold">{props.message}</div>
    </div>
  );
}

export default CustomerFeedback;

import React, { Component } from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stripePromise: null,
    };
  }

  componentDidMount() {
    this.stripeKey().then((key) => {
      this.setState({
        stripePromise: loadStripe(key.data),
      });
    });
  }

  async stripeKey() {
    const res = await axios.get("http://localhost:8000/key");

    return res;
  }

  render() {
    return (
      <div className="mt-20 pt-20">
        {this.state.stripePromise ? (
          <Elements stripe={this.state.stripePromise}>
            <h1>Payment</h1>
            <form id="payment-form">
              <CardElement />

              <button>Pay</button>
            </form>
          </Elements>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

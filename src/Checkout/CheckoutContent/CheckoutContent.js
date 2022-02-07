import axios from "axios";
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../Assets/Images/Logo.png";

import "./CheckoutContent.css";

export default class CheckoutContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutProduct: {},
      stripeKey: null,
    };
  }

  componentDidMount() {
    this.requestHandler().then((resData) => {
      this.stripeKey().then((key) => {
        this.setState({
          checkoutProduct: resData.data[0],
          stripeKey: key.data,
        });
      });
    });
  }

  async requestHandler() {
    const res = await axios.get(
      `http://localhost:8000/course/${this.props.checkoutProductId}`
    );

    return res;
  }

  async stripeKey() {
    const res = await axios.get("http://localhost:8000/key");

    return res;
  }

  makePayment = (token) => {
    const body = {
      token: token,
      product: {
        name: this.state.checkoutProduct.title,
        price: this.state.checkoutProduct.price,
        productBy: "Nart Aliti",
        productId: this.state.checkoutProduct._id,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("currentUser")}`,
    };

    return fetch("http://localhost:8000/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        localStorage.setItem("currentUser", res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return this.state.checkoutProduct ? (
      <div className="checkout-product grid md:grid-cols-2 sm:grid-cols-1">
        <div className="product-image flex align-center justify-center">
          <img
            src={this.state.checkoutProduct.image}
            className="mt-auto mb-auto block"
          />
        </div>
        <div className="product-info w-full">
          <h1 className="font-bold text-4xl mt-5 mb-5 text-blue-200">
            {this.state.checkoutProduct.title}
          </h1>
          <p className="font-bold text-2xl mb-5">
            {this.state.checkoutProduct.desc}
          </p>
          <div className="product-price">
            <h1 className="text-blue-200">
              Price: {this.state.checkoutProduct.price}$
            </h1>
          </div>
          {this.state.checkoutProduct && this.state.stripeKey ? (
            <StripeCheckout
              stripeKey={this.state.stripeKey}
              token={this.makePayment}
              image={logo}
              name={this.state.checkoutProduct.title}
              price={this.state.checkoutProduct.price * 100}
              description={this.state.checkoutProduct.desc}
              panelLabel={`Buy for ${this.state.checkoutProduct.price}$`}
              billingAddress
            >
              <button className="btn w-full">Pay</button>
            </StripeCheckout>
          ) : (
            <></>
          )}
        </div>
      </div>
    ) : (
      <div className="loader"></div>
    );
  }
}

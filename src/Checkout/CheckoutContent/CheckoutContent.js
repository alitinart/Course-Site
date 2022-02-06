import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CheckoutContent.css";

export default class CheckoutContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutProduct: {},
    };
  }

  componentDidMount() {
    this.requestHandler().then((resData) => {
      this.setState({
        checkoutProduct: resData.data[0],
      });
    });
  }

  async requestHandler() {
    const res = await axios.get(
      `http://localhost:8000/course/${this.props.checkoutProductId}`
    );

    return res;
  }

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
          <Link to={"./payment"}>
            <button className="btn mt-10 w-full float-right">Continue</button>
          </Link>
        </div>
      </div>
    ) : (
      <div className="loader"></div>
    );
  }
}

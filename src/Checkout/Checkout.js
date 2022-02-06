import React from "react";
import { useParams } from "react-router-dom";
import "./Checkout.css";
import CheckoutContent from "./CheckoutContent/CheckoutContent";

export default function Checkout() {
  const { id } = useParams();

  return (
    <div className="ml-10 pb-10 mr-10 md:mt-0 md:pt-0 sm:mt-20 sm:pt-20 md:h-screen sm:h-100 checkout">
      <h1 className="text-7xl mt-20 pb-5 mb-5 text-center font-bold">
        Checkout
      </h1>
      <CheckoutContent checkoutProductId={id} />
    </div>
  );
}

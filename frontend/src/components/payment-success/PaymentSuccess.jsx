import React from "react";
import "./PaymentSuccess.css";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="container">
      <div className="success-message">
        <h2 className="text-color">Payment Successful !</h2>
        <p className="text-color">Thank you for choosing CarMob.</p>
        <Link to="/" className="btn btn-success">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

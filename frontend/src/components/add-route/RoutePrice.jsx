import React from "react";

const RoutePrice = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div className="container mt-5 d-flex flex-column justify-content-center mt-n3">
      <div className="text-center mb-3">
        <h1 className="d-flex justify-content-center align-items-center">
          What is your price?
        </h1>
      </div>
      <div className="d-flex justify-content-center ml-5">
        <input
          type="number"
          min={1}
          max={6}
          onChange={handleChange("routePrice")}
          value={values.routePrice}
          className="form-control"
          id="form3Example4c"
          style={{ width: "50%" }}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-success mt-3 d-grid gap-2 col-4 mx-auto"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          className="btn btn-success mt-3 d-grid gap-2 col-4 mx-auto"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoutePrice;

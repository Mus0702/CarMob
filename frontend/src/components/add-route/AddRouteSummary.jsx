import React from "react";

const AddRouteSummary = ({ values, handlePublish, prevStep }) => {
  return (
    <div className="container mt-5 text-color">
      <div className="text-center mb-3">
        <h1>Review your details</h1>
      </div>
      <div className="card text">
        <div className="card-body">
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Departure Address:
            </label>
            <div className="col-sm-8">{values.departureAddress}</div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Arrival Address:
            </label>
            <div className="col-sm-8">{values.arrivalAddress}</div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Departure Date:
            </label>
            <div className="col-sm-8">{values.departureDate}</div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Departure Time:
            </label>
            <div className="col-sm-8">{values.departureTime}</div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Available Seats:
            </label>
            <div className="col-sm-8">{values.availableSeat}</div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label font-weight-bold text-color">
              Route Price:
            </label>
            <div className="col-sm-8">
              €{parseFloat(values.routePrice).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <button onClick={handlePublish} className="btn btn-success me-2">
            Publish
          </button>
          <button onClick={prevStep} className="btn btn-outline-primary">
            Previous
          </button>
        </div>
      </div>
    </div>

    // <div className="container mt-5 d-flex flex-column justify-content-center">
    //   <div className="text-center mb-3">
    //     <h1>Review your details</h1>
    //   </div>
    //   <ul>
    //     <li>
    //       <strong>Departure Address:</strong> {values.departureAddress}
    //     </li>
    //     <li>
    //       <strong>Arrival Address:</strong> {values.arrivalAddress}
    //     </li>
    //     <li>
    //       <strong>Departure Date:</strong> {values.departureDate}
    //     </li>
    //     <li>
    //       <strong>Departure Time:</strong> {values.departureTime}
    //     </li>
    //     <li>
    //       <strong>Available Seats:</strong> {values.availableSeat}
    //     </li>
    //     <li>
    //       <strong>Route Price:</strong> €{values.routePrice}
    //     </li>
    //   </ul>
    //   <button onClick={handlePublish} className="btn btn-success mt-3">
    //     Publish
    //   </button>
    //   <button
    //     className="btn btn-success mt-3 d-grid gap-2 col-4 mx-auto"
    //     onClick={prevStep}
    //   >
    //     Previous
    //   </button>
    // </div>
  );
};

export default AddRouteSummary;

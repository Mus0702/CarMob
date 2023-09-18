import React, { useState, useRef, useEffect } from "react";
const DepartureTIme = ({ nextStep, prevStep, handleChange, values }) => {
  const today = new Date().toISOString().slice(0, 10);
  // let currentTime;
  // let nextHour;

  let minTime = "00:00";
  let disabled = false;

  if (values.departureDate === today) {
    const currentTime = new Date();
    const nextHourTime = new Date(currentTime);
    nextHourTime.setHours(currentTime.getHours() + 1);
    minTime = nextHourTime;
    // currentTime = new Date().toLocaleString();
    // nextHour = currentTime.setHours(currentTime.getHours) + 1;
    // if (nextHour >= 24) {
    //     disabled = true;
    // } else {
    //     const minutes = currentTime.getMinutes();
    //
    //     // Formate l'heure au format HH:mm
    //
    // }
  }

  const handleTimeChange = (e) => {
    handleChange("departureTime")(e);
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center mt-n3">
      <div className="text-center mb-3">
        <h1 className="d-flex justify-content-center align-items-center">
          At what time would you like to go?
        </h1>
      </div>
      <div className="d-flex justify-content-center ml-5">
        <input
          className="form-control"
          type="time"
          value={values.departureTime}
          onChange={handleTimeChange}
          placeholder="00:00"
          min="12:00"
          style={{ width: "25%" }}
          required
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

export default DepartureTIme;

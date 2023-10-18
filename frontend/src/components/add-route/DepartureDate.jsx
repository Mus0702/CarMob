import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const DepartureDate = ({ nextStep, prevStep, handleChange, values }) => {
  const minDate = new Date();
  const handleDateChange = (date) => {
    handleChange("departureDate")({
      target: { value: dayjs(date).format("YYYY-MM-DD") },
    });
  };
  return (
    <div className="container mt-5 d-flex flex-column justify-content-center mt-n3">
      <div className="text-center mb-3">
        <h1 className="d-flex justify-content-center align-items-center">
          When would you like to go?
        </h1>
      </div>
      <div className="d-flex justify-content-center ml-5">
        <DatePicker
          selected={
            values.departureDate ? new Date(values.departureDate) : null
          }
          className="form-control w-100"
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          placeholderText="DD/MM/YYYY"
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

export default DepartureDate;

import React, { useRef, useState } from "react";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
const libraries = ["places"];

const ArrivalAddress = ({ nextStep, prevStep, handleChange, values }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const arrivalSearchBoxRef = useRef(null);

  const onArrivalPlacesChanged = () => {
    const places = arrivalSearchBoxRef.current.getPlaces();
    if (places && places.length === 1) {
      handleChange("arrivalAddress")({
        target: { value: places[0].formatted_address },
      });
    }
  };
  if (!isLoaded) return "Loading...";

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center mt-n3">
      <div className="text-center mb-3">
        <h1 className="d-flex justify-content-center align-items-center">
          Where would you like to go?
        </h1>
      </div>
      <div className="d-flex justify-content-center ml-5">
        <StandaloneSearchBox
          onLoad={(ref) => (arrivalSearchBoxRef.current = ref)}
          onPlacesChanged={onArrivalPlacesChanged}
        >
          <input
            type="text"
            className="form-control w-100"
            placeholder="Arrival address"
            onChange={handleChange("arrivalAddress")}
            value={values.arrivalAddress}
          />
        </StandaloneSearchBox>
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

export default ArrivalAddress;

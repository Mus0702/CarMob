import React, { useRef, useState } from "react";
import "./DepartureAddress.css";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import dayjs from "dayjs";

const libraries = ["places"];

// eslint-disable-next-line react/prop-types
const DepartureAddress = ({ nextStep, handleChange, values }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const departureSearchBoxRef = useRef(null);

  const onDeparturePlacesChanged = () => {
    const places = departureSearchBoxRef.current.getPlaces();
    if (places && places.length === 1) {
      handleChange("departureAddress")({
        target: { value: places[0].formatted_address },
      });
    }
  };
  if (!isLoaded) return "Loading...";

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center mt-n3">
      <div className="text-center mb-3">
        <h1 className="d-flex justify-content-center align-items-center">
          Where do you start from?
        </h1>
      </div>
      <div className="d-flex justify-content-center ml-5">
        {/*<StandaloneSearchBox*/}
        {/*  onLoad={(ref) => (departureSearchBoxRef.current = ref)}*/}
        {/*  onPlacesChanged={onDeparturePlacesChanged}*/}
        {/*>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    className="form-control w-100"*/}
        {/*    placeholder="Departure address"*/}
        {/*  />*/}
        {/*</StandaloneSearchBox>*/}

        <input
          type="text"
          onChange={handleChange("departureAddress")}
          value={values.departureAddress}
          className="form-control"
          placeholder="Departure address"
          id="form3Example4c"
          style={{ width: "50%" }}
        />
      </div>
      <button
        className="btn btn-success mt-3 d-grid gap-2 col-4 mx-auto"
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  );
};

export default DepartureAddress;

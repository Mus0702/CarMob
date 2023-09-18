import React, { useState, useRef } from "react";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchRoute.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const libraries = ["places"];

const SearchRoute = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const [selectedDepartureAddress, setSelectedDepartureAddress] = useState("");
  const [selectedArrivalAddress, setSelectedArrivalAddress] = useState("");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedNumberSeats, setSelectedNumberSeats] = useState("");
  const navigate = useNavigate();

  const departureSearchBoxRef = useRef(null);
  const arrivalSearchBoxRef = useRef(null);

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("departureAddress", selectedDepartureAddress);
    queryParams.append("arrivalAddress", selectedArrivalAddress);
    queryParams.append(
      "departureDate",
      dayjs(selectedDepartureDate).format("YYYY-MM-DD"),
    );
    queryParams.append("numberOfSeats", selectedNumberSeats);
    navigate(`/route-results?${queryParams.toString()}`);
  };

  const onDeparturePlacesChanged = () => {
    const places = departureSearchBoxRef.current.getPlaces();
    if (places && places.length === 1) {
      setSelectedDepartureAddress(places[0].formatted_address);
    }
  };

  const onArrivalPlacesChanged = () => {
    const places = arrivalSearchBoxRef.current.getPlaces();
    if (places && places.length === 1) {
      setSelectedArrivalAddress(places[0].formatted_address);
    }
  };

  if (!isLoaded) return "Loading...";

  return (
    <div className="container h-100">
      <div className=" d-flex  mt-3">
        <StandaloneSearchBox
          onLoad={(ref) => (departureSearchBoxRef.current = ref)}
          onPlacesChanged={onDeparturePlacesChanged}
        >
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Departure address"
          />
        </StandaloneSearchBox>
        <FontAwesomeIcon icon={faLocationDot} bounce size="xl" />

        <StandaloneSearchBox
          onLoad={(ref) => (arrivalSearchBoxRef.current = ref)}
          onPlacesChanged={onArrivalPlacesChanged}
        >
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Arrival address"
          />
        </StandaloneSearchBox>
        <FontAwesomeIcon icon={faLocationDot} bounce size="xl" />

        <DatePicker
          selected={selectedDepartureDate}
          className="form-control w-100"
          onChange={(date) => setSelectedDepartureDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
        />

        <input
          type="number"
          className="form-control w-auto ms-2 me-2"
          value={selectedNumberSeats}
          onChange={(event) => setSelectedNumberSeats(event.target.value)}
          placeholder="number of passengers"
        />

        <button className="btn btn-success" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRoute;

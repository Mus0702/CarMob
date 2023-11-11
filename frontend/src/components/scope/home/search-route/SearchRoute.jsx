import React, { useState, useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchRoute.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useGoogleMaps } from "../../../../context/GoogleMapsContext.jsx";

const SearchRoute = () => {
  const { isLoaded } = useGoogleMaps();

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
      <div className="d-flex flex-column flex-md-row align-items-center mt-3">
        <div className="position-relative me-2 mb-2">
          <StandaloneSearchBox
            onLoad={(ref) => (departureSearchBoxRef.current = ref)}
            onPlacesChanged={onDeparturePlacesChanged}
          >
            <input
              type="text"
              className="form-control w-auto pl-4"
              placeholder="Departure address"
            />
          </StandaloneSearchBox>
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{
              position: "absolute",
              top: "25%",
              right: "10px",
              transform: "translateY(-50%)",
              color: "green",
            }}
            bounce
            size="xl"
          />
        </div>

        <div className="position-relative me-2 mb-2">
          <StandaloneSearchBox
            onLoad={(ref) => (arrivalSearchBoxRef.current = ref)}
            onPlacesChanged={onArrivalPlacesChanged}
          >
            <input
              type="text"
              className="form-control w-auto pl-4"
              placeholder="Arrival address"
            />
          </StandaloneSearchBox>
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{
              position: "absolute",
              top: "25%",
              right: "10px",
              transform: "translateY(-50%)",
              color: "green",
            }}
            bounce
            size="xl"
          />
        </div>

        <DatePicker
          selected={selectedDepartureDate}
          className="form-control w-100 mb-2"
          onChange={(date) => setSelectedDepartureDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
        />

        <input
          type="number"
          min={1}
          max={6}
          className="form-control w-25 ms-2 me-2 mb-2"
          value={selectedNumberSeats}
          onChange={(event) => setSelectedNumberSeats(event.target.value)}
          placeholder="number of passengers"
        />

        <button className="btn btn-success mb-2" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRoute;

import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

import "./RouteDetails.css";

import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const RouteDetails = () => {
  const location = useLocation();
  const routeDetail = location.state?.route;

  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);

  const numberOfSelectedSeats = localStorage.getItem("numberOfSelectedSeats");
  const [priceToDisplay, setPriceToDisplay] = useState(0);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const fetchDirections = async () => {
    if (routeDetail) {
      console.log({ routeDetail });
      const totalPrice = numberOfSelectedSeats * routeDetail.routePrice;
      console.log({ totalPrice });
      setPriceToDisplay(totalPrice);
      const DirectionsService = new window.google.maps.DirectionsService();

      await DirectionsService.route(
        {
          origin: routeDetail.departureAddress,
          destination: routeDetail.arrivalAddress,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            console.log({ directions });
          } else {
            console.error(`error fetching directions: ${status}`);
          }
        },
      );
    }
  };

  useEffect(() => {
    fetchDirections();
  }, [routeDetail]);

  if (!routeDetail) {
    return <div>No route details provided.</div>;
  }

  function handleChat() {
    if (isLoggedIn) {
      navigate(`/chat/${routeDetail.id}`);
    } else {
      localStorage.setItem("redirectToChat", routeDetail.id);
      navigate("/login");
    }
  }

  return (
    <div className="container mt-5 text-color fw-bold">
      <h1 className="text-center mb-4 w-100">
        <span className="text-color">
          {dayjs(routeDetail.departureDate).format("DD/MM/YYYY")}
        </span>
      </h1>
      <div className="w-75">
        <p className="border-bottom border-3 py-3 w-50">
          {routeDetail.departureAddress}
          <FontAwesomeIcon icon={faArrowRight} className="mx-2 text-color" />
          {routeDetail.arrivalAddress}
        </p>
        <p className="">
          Driver: <strong>{routeDetail.driver.firstname}</strong>
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFFF33" }} />{" "}
          <strong>{routeDetail.driver.rating} / 5</strong>
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          <strong>
            {routeDetail.driver.car.brand} {routeDetail.driver.car.model}{" "}
            {routeDetail.driver.car.color}
          </strong>
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          Total Price for {numberOfSelectedSeats} passenger(s) :{" "}
          <strong>{priceToDisplay}€</strong>
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          <FontAwesomeIcon
            icon={faComments}
            size="lg"
            style={{ color: "#0d5c63" }}
            className=""
          />
          <button className="btn" onClick={handleChat}>
            Contact {routeDetail.driver.firstname}
          </button>
        </p>

        <p> Passagers:</p>
        <ul className="border-bottom border-3 py-3 w-50">
          {routeDetail.passengersDTO.map((passenger, index) => (
            <li key={index}>{passenger.firstname}</li>
          ))}
        </ul>

        <Link
          to={"payment-success"}
          //  state={{ route: route }}
          //  key={route.id}
          className="btn-custom btn-custom-success"
        >
          Pay {priceToDisplay}€
        </Link>

        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={{ width: "50%", height: "200px" }}
            center={{ lat: 50.8503, lng: 4.3517 }}
            zoom={10}
            ref={mapRef}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default RouteDetails;

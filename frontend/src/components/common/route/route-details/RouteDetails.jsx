import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { createBooking } from "../../../../service/booking.js";
import { getRouteByIdNotAuth } from "../../../../service/route.js";

import "./RouteDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";

const RouteDetails = () => {
  const [routeDetail, setRouteDetail] = useState();
  const { routeId } = useParams();

  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);

  const numberOfSelectedSeats = localStorage.getItem("numberOfSelectedSeats");
  const [priceToDisplay, setPriceToDisplay] = useState(0);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userConnectedId = sessionStorage.getItem("connectedUserId");

  const fetchDirections = async () => {
    try {
      console.log("l id est " + routeId);
      const response = await getRouteByIdNotAuth(routeId);
      const totalPrice = numberOfSelectedSeats * response.data.routePrice;
      setPriceToDisplay(totalPrice);

      console.log({ response });
      setRouteDetail(response.data);
    } catch (e) {
      console.log(e);
    }
    if (routeDetail) {
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
  }, [routeId]);

  if (!routeDetail) {
    return <div>No route details provided.</div>;
  }

  function handleChat() {
    if (isLoggedIn) {
      navigate(`/chat/${routeDetail.id}`);
      // }
    } else {
      localStorage.setItem("redirectToChat", routeDetail.id);
      navigate("/login");
    }
  }

  const onBook = async () => {
    const booking = {
      routeId: routeDetail.id,
      passengerId: +userConnectedId,
      driverId: routeDetail.driver.id,
      reservedSeats: +numberOfSelectedSeats,
      status: "CONFIRMED",
    };
    if (isLoggedIn) {
      if (userConnectedId == routeDetail.driver.id) {
        toast.error("You cannot book this trip as you are the driver.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        try {
          const response = await createBooking(booking);
          console.log({ response });
          navigate("/message-success", {
            state: { message: "Your payment was successful" },
          });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      localStorage.setItem("redirectedToRouteDetails", routeDetail.id);
      navigate("/login");
    }
  };

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
          {routeDetail.driver.rating !== null ? (
            <>
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFFF33" }} />{" "}
              <strong>{routeDetail.driver.rating.toFixed(1)} / 5</strong>
            </>
          ) : (
            "Driver has not been rated yet."
          )}
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          <strong>
            {routeDetail.driver.car.brand} {routeDetail.driver.car.model}{" "}
            {routeDetail.driver.car.color}
          </strong>
        </p>
        <p className="border-bottom border-3 py-3 w-50">
          Total Price for {numberOfSelectedSeats} passenger(s) :{" "}
          <strong>€{priceToDisplay.toFixed(2)}</strong>
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
        {routeDetail.passengersDTO.length > 0 ? (
          <>
            <p> Passengers:</p>
            <ul className="border-bottom border-3 pb-3 w-50">
              {routeDetail.passengersDTO.map((passenger, index) => (
                <li key={index}>{passenger.firstname}</li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mb-2">No passsengers yet</div>
        )}

        <button className="btn-custom btn-custom-success" onClick={onBook}>
          {" "}
          Pay €{priceToDisplay.toFixed(2)}
        </button>

        {/*<LoadScript*/}
        {/*  googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}*/}
        {/*>*/}
        {/*  <GoogleMap*/}
        {/*    mapContainerStyle={{ width: "50%", height: "200px" }}*/}
        {/*    center={{ lat: 50.8503, lng: 4.3517 }}*/}
        {/*    zoom={10}*/}
        {/*    ref={mapRef}*/}
        {/*  >*/}
        {/*    {directions && <DirectionsRenderer directions={directions} />}*/}
        {/*  </GoogleMap>*/}
        {/*</LoadScript>*/}
      </div>
    </div>
  );
};

export default RouteDetails;

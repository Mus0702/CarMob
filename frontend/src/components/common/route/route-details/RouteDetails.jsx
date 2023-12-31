import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth.jsx";
import { createBooking } from "../../../../service/booking.js";
import { getRouteByIdNotAuth } from "../../../../service/route.js";
import { useGoogleMaps } from "../../../../context/GoogleMapsContext.jsx";
import "./RouteDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";

const RouteDetails = () => {
  const [routeDetail, setRouteDetail] = useState();
  const { routeId } = useParams();
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const { isLoaded, loadError } = useGoogleMaps();

  const numberOfSelectedSeats = localStorage.getItem("numberOfSelectedSeats");
  const [priceToDisplay, setPriceToDisplay] = useState(0);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userConnectedId = sessionStorage.getItem("connectedUserId");

  const formatTime = (timeString) => {
    if (timeString) {
      const [hour, minute] = timeString.split(":");
      return `${hour}:${minute}`;
    }
    return "";
  };
  const fetchData = async () => {
    try {
      const response = await getRouteByIdNotAuth(routeId);
      const totalPrice = numberOfSelectedSeats * response.data.routePrice;
      setPriceToDisplay(totalPrice);
      setRouteDetail(response.data);

      const DirectionsService = new window.google.maps.DirectionsService();
      await DirectionsService.route(
        {
          origin: response.data.departureAddress,
          destination: response.data.arrivalAddress,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions: ${status}`);
          }
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [routeId, isLoaded]);

  if (!routeDetail) {
    return <div>No route details provided.</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading Google Maps: {loadError.message}</div>;
  }
  function handleChat() {
    if (isLoggedIn) {
      if (+userConnectedId === routeDetail.driver.id) {
        toast.error(
          "You can not use the chat as you are the driver of this route",
        );
      } else {
        navigate(`/chat/${routeDetail.id}/${+userConnectedId}`);
      }
      // }
    } else {
      localStorage.setItem("redirectToChat", routeDetail.id);
      navigate("/login");
    }
  }

  const onBook = async () => {
    console.log({ routeDetail });
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
          toast.error(e.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
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
          {dayjs(routeDetail.departureDate).format("DD/MM/YYYY")} at{" "}
          {formatTime(routeDetail.departureTime)}
        </span>
      </h1>
      <div className="row">
        <div className="col-md-6">
          <div>
            <p className="border-bottom border-3 py-3 w-50">
              {routeDetail.departureAddress}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mx-2 text-color"
              />
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
                  {routeDetail.passengersDTO.map((passenger) => (
                    <li key={passenger.id}>{passenger.firstname}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="mb-2">No passsengers yet</div>
            )}
            {routeDetail &&
              +userConnectedId !== routeDetail.driver.id &&
              (new Date(routeDetail.departureDate).setHours(0, 0, 0, 0) >
                new Date().setHours(0, 0, 0, 0) ||
                (new Date(routeDetail.departureDate).setHours(0, 0, 0, 0) ===
                  new Date().setHours(0, 0, 0, 0) &&
                  (parseInt(routeDetail.departureTime.split(":")[0], 10) >
                    new Date().getHours() ||
                    (parseInt(routeDetail.departureTime.split(":")[0], 10) ===
                      new Date().getHours() &&
                      parseInt(routeDetail.departureTime.split(":")[1], 10) >
                        new Date().getMinutes())))) && (
                <button
                  className="btn-custom btn-custom-success"
                  onClick={onBook}
                >
                  Pay €{priceToDisplay.toFixed(2)}
                </button>
              )}
          </div>
        </div>

        <div className="col-md-6">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={{ lat: 50.8503, lng: 4.3517 }}
            zoom={10}
            ref={mapRef}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;

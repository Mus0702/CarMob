import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";

const RouteDetails = () => {
  const location = useLocation();
  const routeDetail = location.state?.route;

  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);

  const fetchDirections = async () => {
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
  }, [routeDetail]);

  if (!routeDetail) {
    return <div>No route details provided.</div>;
  }

  return (
    <div className="route-details-container">
      <h2>
        Details for Route: {routeDetail.departureAddress} -{" "}
        {routeDetail.arrivalAddress}
      </h2>
      <p>Departure Date: {routeDetail.departureDate}</p>
      <p>
        Driver: {routeDetail.driver.firstname} {routeDetail.driver.lastname}
      </p>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 50.8503, lng: 4.3517 }}
          zoom={10}
          ref={mapRef}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RouteDetails;

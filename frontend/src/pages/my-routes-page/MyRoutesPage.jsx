import React, { useEffect, useState } from "react";
import { userConnectedId } from "../../utils/userConnectedId.js";
import { getMyRoutes } from "../../service/route.js";
import Loader from "../../components/common/loader/Loader.jsx";
import SearchBanner from "../../components/common/banner/search-banner/SearchBanner.jsx";
import RoutesList from "../../components/common/route/RoutesList.jsx";

const MyRoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [driverRoutes, setDriverRoutes] = useState([]);
  const [passengerRoutes, setPassengerRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyRoutes = async () => {
    try {
      const response = await getMyRoutes(+userConnectedId);
      const driverRoutes = response.data.filter(
        (route) => route.driver.id === +userConnectedId,
      );
      const passengerRoutes = response.data.filter((route) =>
        route.passengersDTO.some(
          (passenger) => passenger.id === +userConnectedId,
        ),
      );
      setDriverRoutes(driverRoutes);
      setPassengerRoutes(passengerRoutes);
      setIsLoading(false);
      // setRoutes(response.data);
      console.log("reponse ", response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchMyRoutes();
  }, [+userConnectedId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="section">
            <h2 className="text-center text-color fw-bold">
              My Routes as Driver
            </h2>
            {driverRoutes.length > 0 ? (
              <RoutesList routes={driverRoutes} />
            ) : (
              <p className="text-center text-color">
                You have no routes as a driver.
              </p>
            )}
          </div>
          <div className="section">
            <h2 className="text-center text-color fw-bold">
              My Routes as Passenger
            </h2>
            {passengerRoutes.length > 0 ? (
              <RoutesList routes={passengerRoutes} />
            ) : (
              <p className="text-center text-color">
                You have no routes as a passenger.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MyRoutesPage;

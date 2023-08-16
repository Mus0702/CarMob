import { useParams, useSearchParams } from "react-router-dom";

import SearchBanner from "../../components/common/banner/search-banner/SearchBanner.jsx";
import { getSearchRoutes } from "../../service/route.js";
import { useEffect, useState } from "react";
import RoutesList from "../../components/common/route/RoutesList.jsx";
import Loader from "../../components/common/loader/Loader.jsx";

//url = http://localhost:5173/route-results?departureAddress=Avenue%20Louise%202,%201000%20Bruxelles&arrivalAddress=Chauss%C3%A9e%20de%20Gand%20500&departureDate=2023-11-20&numberOfSeats=1

const content = [
  {
    id: 1,
    departureAddress: "Boulevard e. bockstal 256",
    arrivalAddress: "Charleroi",
    departureDate: "27/10/2023",
    numberOfSeats: 2,
    driver: {
      lastname: "Azoud",
      firstname: "Muss",
    },
  },
  {
    id: 2,
    departureAddress: "Boulevard Souverain 256",
    arrivalAddress: "Aeroport de Bruxelles",
    departureDate: "27/10/2023",
    numberOfSeats: 2,
    driver: {
      lastname: "John",
      firstname: "Doe",
    },
  },
];
const RoutesResultsPage = () => {
  const [searchParams] = useSearchParams();
  // const [routes, setRoutes] = useState([content]);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRouteResults = async () => {
    try {
      const response = await getSearchRoutes({
        departureAddress: searchParams.get("departureAddress"),
        arrivalAddress: searchParams.get("arrivalAddress"),
        departureDate: searchParams.get("departureDate"),
        numberOfSeats: searchParams.get("numberOfSeats"),
      });
      setRoutes(response.data.content);
      setIsLoading(false);

      console.log({ response });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRouteResults();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <SearchBanner resultSize={routes.length} />
          <RoutesList routes={routes} />
        </>
      )}
    </>
  );
};

export default RoutesResultsPage;

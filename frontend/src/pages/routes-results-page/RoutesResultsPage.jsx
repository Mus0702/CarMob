import { useParams, useSearchParams } from "react-router-dom";

import SearchBanner from "../../components/common/banner/search-banner/SearchBanner.jsx";
import { getSearchRoutes } from "../../service/route.js";
import "./RouteResultsPage.css";
import { useEffect, useState } from "react";
import RoutesList from "../../components/common/route/RoutesList.jsx";
import Loader from "../../components/common/loader/Loader.jsx";

//test url = http://localhost:5173/route-results?departureAddress=Avenue%20Louise%202,%201000%20Bruxelles&arrivalAddress=Ar%C3%A9roport%20de%20Bruxelles&departureDate=2023-11-15&numberOfSeats=1

// const content = [
//   {
//     id: 1,
//     departureAddress: "Boulevard e. bockstal 256",
//     arrivalAddress: "Charleroi",
//     departureDate: "27/10/2023",
//     numberOfSeats: 2,
//     driver: {
//       lastname: "Azoud",
//       firstname: "Muss",
//     },
//   },
//   {
//     id: 2,
//     departureAddress: "Boulevard Souverain 256",
//     arrivalAddress: "Aeroport de Bruxelles",
//     departureDate: "27/10/2023",
//     numberOfSeats: 2,
//     driver: {
//       lastname: "John",
//       firstname: "Doe",
//     },
//   },
// ];
const RoutesResultsPage = () => {
  const [searchParams] = useSearchParams();
  // const [routes, setRoutes] = useState([content]);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRouteResults = async (page = 1) => {
    try {
      const response = await getSearchRoutes({
        departureAddress: searchParams.get("departureAddress"),
        arrivalAddress: searchParams.get("arrivalAddress"),
        departureDate: searchParams.get("departureDate"),
        numberOfSeats: searchParams.get("numberOfSeats"),
        page: currentPage - 1,
      });

      const sortedRoutes = response.data.content.sort(
        (a, b) => a.distance - b.distance,
      );

      setRoutes(sortedRoutes);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      console.log({ response });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("current page dans handlPagechange " + currentPage);
    fetchRouteResults(page);
  };

  useEffect(() => {
    fetchRouteResults(currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <SearchBanner resultSize={totalElements} />
          <RoutesList routes={routes} />
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  let buttons = [];

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>,
    );
  }

  return <div className="pagination-container">{buttons}</div>;
};

export default RoutesResultsPage;

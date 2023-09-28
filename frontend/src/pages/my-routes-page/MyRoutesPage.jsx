import React, { useEffect, useState } from "react";
import { getMyRoutes } from "../../service/route.js";
import Loader from "../../components/common/loader/Loader.jsx";
import SearchBar from "../../components/common/search-bar/SearchBar.jsx";
import RoutesList from "../../components/common/route/RoutesList.jsx";

const MyRoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const userConnectedId = sessionStorage.getItem("connectedUserId");

  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [hasSearched, setHasSearched] = useState(false);

  const fetchMyRoutes = async () => {
    try {
      const response = await getMyRoutes(+userConnectedId);
      setRoutes(response.data);
      console.log({ routes: response.data });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const isInFuture = (route) => {
    const routeTime = new Date(route.departureDate + "T" + route.departureTime);
    return routeTime >= new Date();
  };

  const dateMatchesSearch = (departureDate, term) => {
    const [year, month, day] = departureDate.split("-");
    const reformattedDate = [day, month, year].join("-");

    const normalizedTerm = term.replace(/\//g, "-");

    if (normalizedTerm.length === 10) {
      return reformattedDate === normalizedTerm;
    }
    const searchComponents = normalizedTerm.split("-");

    if (searchComponents.length === 1) {
      return reformattedDate.includes(normalizedTerm);
    }

    return searchComponents.every((component, index) => {
      return reformattedDate.split("-")[index].startsWith(component);
    });
  };

  const filteredRoutes = routes.filter((route) => {
    const term = searchItem.toLowerCase();

    const matchesDepartureDate = dateMatchesSearch(route.departureDate, term);
    const matchesDepartureAddress = route.departureAddress
      .toLowerCase()
      .includes(term);
    const matchesArrivalAddress = route.arrivalAddress
      .toLowerCase()
      .includes(term);

    return (
      matchesDepartureDate || matchesDepartureAddress || matchesArrivalAddress
    );
  });

  const filteredFutureDriverRoutes = filteredRoutes.filter(
    (route) => isInFuture(route) && route.driverId === +userConnectedId,
  );

  const filteredPastDriverRoutes = filteredRoutes.filter(
    (route) => !isInFuture(route) && route.driverId === +userConnectedId,
  );

  const filteredFuturePassengerRoutes = filteredRoutes.filter(
    (route) =>
      isInFuture(route) &&
      route.passengersDTO.some(
        (passenger) => passenger.id === +userConnectedId,
      ),
  );

  const filteredPastPassengerRoutes = filteredRoutes.filter(
    (route) =>
      !isInFuture(route) &&
      route.passengersDTO.some(
        (passenger) => passenger.id === +userConnectedId,
      ),
  );
  const sortByDateDesc = (a, b) => {
    return a.departureDate.localeCompare(b.departureDate);
  };

  const sortedFutureDriverRoutes =
    filteredFutureDriverRoutes.sort(sortByDateDesc);
  const sortedPastDriverRoutes = filteredPastDriverRoutes.sort(sortByDateDesc);
  const sortedFuturePassengerRoutes =
    filteredFuturePassengerRoutes.sort(sortByDateDesc);
  const sortedPastPassengerRoutes =
    filteredPastPassengerRoutes.sort(sortByDateDesc);

  const handleSearchChange = (value) => {
    setSearchItem(value);
    setHasSearched(true);
  };
  useEffect(() => {
    fetchMyRoutes();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col ml-auto">
              <SearchBar
                searchItem={searchItem}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="section my-5">
            <h2 className="text-white fw-bold bg-success p-3 rounded">
              My Routes as Driver
            </h2>
            <div className="my-5">
              <h3 className="text-color fw-bold">Upcoming</h3>
              {filteredFutureDriverRoutes.length > 0 ? (
                <RoutesList
                  routes={sortedFutureDriverRoutes}
                  buttonView="MyRoutes"
                  isInFuture={isInFuture}
                  isDriver={true}
                  setRoutes={setRoutes}
                  allRoutes={routes}
                  onSearch={hasSearched}
                />
              ) : (
                <p className="text-color">
                  You have no upcoming routes as a driver.
                </p>
              )}
            </div>
            <div className="mb-5">
              <h3 className="fw-bold text-color">Past</h3>
              {filteredPastDriverRoutes.length > 0 ? (
                <RoutesList
                  routes={sortedPastDriverRoutes}
                  buttonView="MyRoutes"
                  isInFuture={isInFuture}
                  setRoutes={() => null}
                  allRoutes={routes}
                  onSearch={hasSearched}
                />
              ) : (
                <p className="text-color">
                  You have no past routes as a driver.
                </p>
              )}
            </div>
          </div>

          <div className="section">
            <h2 className=" fw-bold text-white mb-5 bg-success rounded p-3">
              My Routes as Passenger
            </h2>

            <h3 className="text-color fw-bold">Upcoming</h3>
            {filteredFuturePassengerRoutes.length > 0 ? (
              <RoutesList
                routes={sortedFuturePassengerRoutes}
                buttonView="MyRoutes"
                isInFuture={isInFuture}
                isDriver={false}
                setRoutes={setRoutes}
                allRoutes={routes}
                onSearch={hasSearched}
              />
            ) : (
              <p className="text-center text-color">
                You have no upcoming routes as a passenger.
              </p>
            )}

            <h3 className="fw-bold text-color">Past</h3>
            {filteredPastPassengerRoutes.length > 0 ? (
              <RoutesList
                routes={sortedPastPassengerRoutes}
                buttonView="MyRoutes"
                isInFuture={isInFuture}
                setRoutes={() => null}
                allRoutes={routes}
                onSearch={hasSearched}
              />
            ) : (
              <p className="text-color">
                You have no past routes as a passenger.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyRoutesPage;

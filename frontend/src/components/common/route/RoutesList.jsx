import PropTypes from "prop-types";

import RouteItem from "./RouteItem.jsx";
import { useEffect, useState } from "react";

const RoutesList = ({
  routes,
  buttonView,
  isInFuture,
  isDriver,
  setRoutes,
  allRoutes,
  onSearch,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(routes.length / itemsPerPage);

  const displayRoutes = routes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const cancelRoute = (routeId) => {
    console.log("routes dans on cancel = ", routes);
    if (!routeId) return;
    const newRoutes = allRoutes.filter((route) => route.id !== routeId);
    console.log("new route = ", newRoutes);
    setRoutes(newRoutes);
  };

  useEffect(() => {
    if (onSearch) {
      setCurrentPage(1);
    }
  }, [onSearch, setCurrentPage]);
  return (
    <div className="container mt-3">
      {displayRoutes.length === 0 ? (
        <div className="text-center">
          <h1>No routes to display.</h1>
        </div>
      ) : (
        <>
          <div className="row">
            {displayRoutes.map((route) => (
              <div key={route.id} className="col-md-4">
                <RouteItem
                  route={route}
                  key={route.id}
                  buttonView={buttonView}
                  isInFuture={isInFuture}
                  isDriver={isDriver}
                  onCancelRoute={cancelRoute}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-center">
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Précédent
            </button>
            <span className="mx-2">
              {currentPage} / {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoutesList;

RoutesList.propTypes = {
  routes: PropTypes.array,
};

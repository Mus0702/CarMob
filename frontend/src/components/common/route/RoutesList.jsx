import PropTypes from "prop-types";

import RouteItem from "./RouteItem.jsx";
import { useEffect } from "react";

const RoutesList = ({
  routes,
  buttonView,
  isInFuture,
  isDriver,
  setRoutes,
  allRoutes,
}) => {
  const cancelRoute = (routeId) => {
    console.log("routes dans on cancel = ", routes);
    if (!routeId) return;
    const newRoutes = allRoutes.filter((route) => route.id !== routeId);
    console.log("new route = ", newRoutes);
    setRoutes(newRoutes);
  };
  return (
    <div className="container mt-3">
      {routes.length === 0 ? (
        <div className="text-center">
          <h1>No routes to display.</h1>
        </div>
      ) : (
        <div className="row">
          {routes.map((route) => (
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
      )}
    </div>
  );
};

export default RoutesList;

RoutesList.propTypes = {
  routes: PropTypes.array,
};

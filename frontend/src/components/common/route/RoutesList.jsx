import PropTypes from "prop-types";

import RouteItem from "./RouteItem.jsx";

const RoutesList = ({ routes }) => {
  return (
    <div className="container mt-3">
      {routes.length === 0 ? (
        <div className="text-center">
          <h1>No routes to display.</h1>
        </div>
      ) : (
        routes.map((route) => <RouteItem route={route} key={route.id} />)
      )}
    </div>
    // <div className="container mt-3">
    //   {routes.length > 0 &&
    //     routes.map((route) => <RouteItem route={route} key={route.id} />)}
    // </div>
  );
};

export default RoutesList;

RoutesList.propTypes = {
  routes: PropTypes.array,
};

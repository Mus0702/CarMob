import PropTypes from "prop-types";

import RouteItem from "./RouteItem.jsx";

const RoutesList = ({ routes }) => {
  return (
    <div className="container">
      {routes.length > 0 &&
        routes.map((route) => <RouteItem route={route} key={route.id} />)}
    </div>
  );
};

export default RoutesList;

RoutesList.propTypes = {
  routes: PropTypes.array,
};

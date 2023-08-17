import PropTypes from "prop-types";
import "./RouteItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RouteItem = ({ route }) => {
  return (
    <div>
      <div className=" text-center fw-bold bg-white">
        {route.distance} meters from your departure address{" "}
      </div>
      <div className="card text-center mb-3 shadow-lg border-0 py-4">
        <div className="card-body">
          <h5 className="text-color fw-bold">{route.departureDate}</h5>
          <div className="d-flex align-items-center justify-content-center fw-bold">
            <p className="card-text text-color">{route.departureAddress}</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="mx-2 mb-3 text-color"
            />
            <p className="text-color">{route.arrivalAddress}</p>
          </div>
          <div className="text-color bg-white border-0 fw-bold pb-1">
            <p>Driver name : {route.driver.firstname}</p>
          </div>
          <Link
            to={`/routeDetails/${route.id}`}
            className="btn-custom btn-custom-success"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RouteItem;

RouteItem.propTypes = {
  route: PropTypes.object,
};

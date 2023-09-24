import PropTypes from "prop-types";
import "./RouteItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import ModifyRouteModal from "../../modal/ModifyRouteModal.jsx";
import { useState } from "react";
const RouteItem = ({ route, buttonView, isInFuture, isDriver }) => {
  const [showModal, setShowModal] = useState(false);
  const formatTime = (timeString) => {
    if (timeString) {
      const [hour, minute] = timeString.split(":");
      return `${hour}:${minute}`;
    }
    return "";
  };
  let isUpComming;
  if (buttonView === "MyRoutes") {
    isUpComming = isInFuture(route);
  }
  return (
    <div>
      {route.distance !== null && (
        <div className="text-center fw-bold bg-white mb-3">
          {route.distance} meters from your departure address
        </div>
      )}
      <div className="card text-center mb-3 shadow-lg border-0 py-4">
        <div className="card-body">
          <h5 className="text-color fw-bold">
            {dayjs(route.departureDate).format("DD-MM-YYYY")} at{" "}
            {formatTime(route.departureTime)}
          </h5>
          <div className="d-flex align-items-center justify-content-center fw-bold">
            <p className="card-text text-color">{route.departureAddress}</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="mx-2 mb-3 text-color"
            />
            <p className="text-color">{route.arrivalAddress}</p>
          </div>
          {/*<div className="text-color bg-white border-0 fw-bold pb-1">*/}
          {/*  <p>Driver name : {route.driver.firstname}</p>*/}
          {/*</div>*/}
          {/*<Link*/}
          {/*  to={`/routeDetails/${route.id}`}*/}
          {/*  state={{ route: route }}*/}
          {/*  key={route.id}*/}
          {/*  className="btn-custom btn-custom-success"*/}
          {/*>*/}
          {/*  Details*/}
          {/*</Link>*/}
          {buttonView !== "MyRoutes" && (
            <Link
              to={`/routeDetails/${route.id}`}
              state={{ route: route }}
              key={route.id}
              className="btn-custom btn-custom-success"
            >
              Details
            </Link>
          )}

          {buttonView === "MyRoutes" && isUpComming && (
            <>
              {isDriver && (
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary mx-1"
                >
                  Modify
                </button>
                // <Link
                //   to={`/modifyRoute/${route.id}`}
                //   className="btn btn-primary mx-1"
                // >
                //   Modify
                // </Link>
              )}
              <ModifyRouteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                routeDetails={route}
              />
              <Link
                to={`/deleteRoute/${route.id}`}
                className="btn btn-danger mx-1"
              >
                Delete
              </Link>
            </>
          )}

          {buttonView === "MyRoutes" && !isUpComming && (
            <em className="text-color text-muted">Completed</em>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteItem;
RouteItem.propTypes = {
  route: PropTypes.object,
};

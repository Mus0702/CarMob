import PropTypes from "prop-types";
import "./RouteItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { saveRoute } from "../../../service/route.js";
import { cancelRouteAsPassenger } from "../../../service/route.js";
import { cancelRouteAsDriver } from "../../../service/route.js";

import ModifyRouteModal from "../../modal/ModifyRouteModal.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { userConnectedId } from "../../../utils/userConnectedId.js";
const RouteItem = ({ route, buttonView, isInFuture, isDriver }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

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
  const handleOnUpdate = async (formData) => {
    try {
      console.log({ formData });
      await saveRoute(formData);
      setShowModal(false);
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleOnDelete = async () => {
    try {
      await cancelRouteAsDriver(route.id);
      setShowDeleteModal(false);
      toast.success("Cancelled successfully as driver", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.log(e.response?.data || e.message);
      toast.error(e.response?.data || "Failed to cancel as driver", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleCancelAsPassenger = async () => {
    try {
      await cancelRouteAsPassenger(route.id, +userConnectedId);
      setShowCancelModal(false);
      toast.success("Cancelled successfully as passenger", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      console.log(e.response?.data || e.message);
      toast.error(e.response?.data || "Failed to cancel as passenger", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div>
      {route.distance && (
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
              {isDriver ? (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary mx-1"
                  >
                    Modify
                  </button>
                  <ModifyRouteModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    routeDetails={route}
                    onSubmit={handleOnUpdate}
                  />
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </Button>

                  <Modal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to cancel this trip?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        No
                      </Button>
                      <Button variant="success" onClick={handleOnDelete}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
                <>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel as Passenger
                  </Button>
                  <Modal
                    show={showCancelModal}
                    onHide={() => setShowCancelModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you do not want to be a passenger on this
                      route?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowCancelModal(false)}
                      >
                        No
                      </Button>
                      <Button
                        variant="success"
                        onClick={handleCancelAsPassenger}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </>
          )}

          {buttonView === "MyRoutes" && !isUpComming && (
            <em className="text-white bg-info">Completed</em>
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

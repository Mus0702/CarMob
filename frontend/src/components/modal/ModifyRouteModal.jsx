// ModifyRouteModal.jsx
import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

const ModifyRouteModal = ({ show, handleClose, routeDetails, onSubmit }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  const departureSearchBoxRef = useRef(null);
  const arrivalSearchBoxRef = useRef(null);

  const [formData, setFormData] = useState({
    departureAddress: routeDetails.departureAddress,
    arrivalAddress: routeDetails.arrivalAddress,
    departureDate: routeDetails.departureDate,
    departureTime: routeDetails.departureTime,
    routePrice: routeDetails.routePrice,
  });

  const today = new Date().toISOString().split("T")[0];
  const onDeparturePlacesChanged = () => {
    console.log("oucoucocu");
    const places = departureSearchBoxRef.current.getPlaces();
    if (places && places.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        departureAddress: places[0].formatted_address,
      }));
    }
  };

  const onArrivalPlacesChanged = () => {
    const places = arrivalSearchBoxRef.current.getPlaces();
    const place = places[0];
    if (place) {
      setFormData((prevData) => ({
        ...prevData,
        arrivalAddress: place.formatted_address,
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log({ formData });
  };
  if (!isLoaded) return "Loading...";

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modify Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Departure Address</Form.Label>
            {/*<StandaloneSearchBox*/}
            {/*  onLoad={(ref) => (departureSearchBoxRef.current = ref)}*/}
            {/*  onPlacesChanged={onDeparturePlacesChanged}*/}
            {/*>*/}
            <Form.Control
              type="text"
              name="departureAddress"
              value={formData.departureAddress}
              placeholder="Departure address"
              onChange={handleChange}
            />
            {/*</StandaloneSearchBox>*/}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Arrival Address</Form.Label>
            <Form.Control
              type="text"
              name="arrivalAddress"
              value={formData.arrivalAddress}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              min={today}
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Route Price</Form.Label>
            <Form.Control
              type="number"
              name="routePrice"
              value={formData.routePrice}
              onChange={handleChange}
              step="0.01"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} /> Close
        </Button>
        <Button variant="primary" onClick={() => onSubmit(formData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModifyRouteModal;

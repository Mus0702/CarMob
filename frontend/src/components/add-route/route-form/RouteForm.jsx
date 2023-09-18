import React, { useEffect, useState } from "react";
import DepartureAddress from "../departure-address/DepartureAddress.jsx";
import ArrivalAddress from "../arrival-address/ArrivalAddress.jsx";
import DepartureDate from "../DepartureDate.jsx";
import DepartureTIme from "../DepartureTIme.jsx";
import AvailableSeats from "../AvailableSeats.jsx";
import RoutePrice from "../RoutePrice.jsx";
import ProgressBarr from "../../common/progress-bar/ProgressBarr.jsx";
import { useNavigate } from "react-router-dom";
import AddRouteSummary from "../AddRouteSummary.jsx";
import { createRoute } from "../../../service/route.js";
import { toast } from "react-toastify";

const RouteForm = () => {
  const userConnectedId = sessionStorage.getItem("connectedUserId");
  console.log("user id " + userConnectedId);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departureAddress: "",
    arrivalAddress: "",
    departureDate: "",
    departureTime: "",
    driverId: +userConnectedId,
    availableSeat: "",
    routePrice: "",
  });
  const handlePublish = async () => {
    console.log({ formData });
    try {
      const response = await createRoute(formData);
      if (response) {
        toast.success("Your route has been successfully published.");
        navigate("/");
      }
    } catch (e) {
      console.log(e.response.data);
      toast.error(e.response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
    console.log({ formData });
  };

  useEffect(() => {}, [step]);
  return (
    <div className="container">
      <div className="mt-5">
        <ProgressBarr step={step} />
      </div>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {(() => {
          switch (step) {
            case 1:
              return (
                <DepartureAddress
                  nextStep={nextStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 2:
              return (
                <ArrivalAddress
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 3:
              return (
                <DepartureDate
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 4:
              return (
                <DepartureTIme
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 5:
              return (
                <AvailableSeats
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 6:
              return (
                <RoutePrice
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleChange={handleChange}
                  values={formData}
                />
              );
            case 7:
              return (
                <AddRouteSummary
                  values={formData}
                  handlePublish={handlePublish}
                  prevStep={prevStep}
                />
              );
            default:
              return <div>Error: Unknown step</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default RouteForm;

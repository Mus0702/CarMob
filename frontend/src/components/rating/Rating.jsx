import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getRouteById } from "../../service/route.js";
import { useAuth } from "../../hooks/useAuth.jsx";
import Loader from "../common/loader/Loader.jsx";
import { userConnectedId } from "../../utils/userConnectedId.js";
import { createRating } from "../../service/rating.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Rating.css";

const Rating = () => {
  const [route, setRoute] = useState();
  const { routeId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const userConnectedId = sessionStorage.getItem("connectedUserId");

  const fetchRoute = async () => {
    if (isLoggedIn) {
      try {
        const response = await getRouteById(routeId);
        console.log({ response });
        console.log({ userConnectedId });
        setRoute(response.data);
        setIsLoading(false);
      } catch (e) {
        const errorMessage = e.response.data || "Something went wrong!";
        console.error(errorMessage);
      }
    } else {
      localStorage.setItem("redirectToRating", routeId);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [routeId]);

  const onRate = async () => {
    console.log({ route });
    const rating = {
      routeId: routeId,
      passengerId: userConnectedId,
      driverId: route.driver.id,
      rating: Number(ratingValue),
    };
    try {
      const response = await createRating(rating);
      console.log({ response });
      if (response) {
        navigate("/message-success", {
          state: { message: "Your evaluation has been sent correctly." },
        });
      }
    } catch (e) {
      const errorMessage = e.response.data || "Something went wrong!";
      console.log({ errorMessage });
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center text-color">
          {route && <h2> Please rate the driver {route.driver.firstname}</h2>}
          <input
            type="number"
            className="form-control"
            min={1}
            max={5}
            value={ratingValue}
            onChange={(event) => setRatingValue(event.target.value)}
          />
          <div className="mt-2 align-items-center">
            <button className="btn btn-success" onClick={onRate}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;

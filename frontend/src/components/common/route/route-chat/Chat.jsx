import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRouteById } from "../../../../service/route.js";

const Chat = () => {
  const [route, setRoute] = useState(null);
  const { routeId } = useParams();

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await getRouteById(routeId);
        setRoute(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRoute();
  }, [routeId]);

  return (
    <div>
      Voici le composant de chat
      <div>
        {route && (
          <Link
            to={`/routeDetails/${route.id}`}
            state={{ route: route }}
            key={route.id}
            className="btn-custom btn-custom-success"
          >
            Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default Chat;

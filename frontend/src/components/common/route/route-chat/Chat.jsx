import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRouteById } from "../../../../service/route.js";
import {
  connect,
  sendMessage,
  disconnect,
} from "../../../../service/webSocket.js";

const Chat = () => {
  const [route, setRoute] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { routeId } = useParams();
  const userConnectedId = sessionStorage.getItem("connectedUserId");

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
  }, []);

  useEffect(() => {
    if (route) {
      connect(userConnectedId, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
    return () => {
      disconnect();
    };
  }, [route]);
  // useEffect(() => {
  //   const fetchRoute = async () => {
  //     try {
  //       const response = await getRouteById(routeId);
  //       setRoute(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //
  //   fetchRoute();
  //   connect(userConnectedId, (newMessage) => {
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   });
  //   return () => {
  //     disconnect();
  //   };
  // }, []);

  const handleSendMessage = () => {
    // if (userConnectedId === route.driver.id) {
    //   sendMessage({
    //     content: message,
    //     sender: userConnectedId,
    //     receiver: route.driver.id,
    //     route: routeId,
    //   });
    // }
    sendMessage({
      content: message,
      senderId: +userConnectedId,
      receiverId: route.driver.id,
      routeId: +routeId,
    });
    setMessages((prevMessages) => [...prevMessages, { content: message }]);

    setMessage("");
  };

  return (
    <div>
      Voici le composant de chat
      <div className="message-section">
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Saisissez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
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

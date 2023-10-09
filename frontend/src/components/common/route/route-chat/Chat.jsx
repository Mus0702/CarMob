import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRouteById } from "../../../../service/route.js";
import { getMessages } from "../../../../service/message.js";
import { connect, sendMessage } from "../../../../service/webSocket.js";
import { getUserById } from "../../../../service/user.js";
import dayjs from "dayjs";
import RouteItem from "../RouteItem.jsx";

const Chat = () => {
  const [route, setRoute] = useState(null);
  const [potentialPassenger, setPotentialPassenger] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { routeId, senderId } = useParams();
  const userConnectedId = sessionStorage.getItem("connectedUserId");
  const today = new Date().toISOString();

  const fetchRouteAndMessages = async () => {
    const response = await getRouteById(routeId);
    setRoute(response.data);

    const userResponse = await getUserById(senderId);
    setPotentialPassenger(userResponse.data);

    let receiverId, senderMsgId;
    if (Number(userConnectedId) === response.data.driver.id) {
      receiverId = response.data.driver.id;
      senderMsgId = Number(senderId);
    } else {
      receiverId = Number(userConnectedId);
      senderMsgId = response.data.driver.id;
    }

    const messageResponse = await getMessages(routeId, senderMsgId, receiverId);
    setMessages(messageResponse.data.length > 0 ? messageResponse.data : []);
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const determineReceiverAndSender = () => {
    let receiverId, senderMsgId;
    if (route && Number(userConnectedId) === route.driver.id) {
      receiverId = Number(senderId);
      senderMsgId = Number(userConnectedId);
    } else {
      receiverId = route.driver.id;
      senderMsgId = Number(userConnectedId);
    }
    return { receiverId, senderMsgId };
  };

  useEffect(() => {
    fetchRouteAndMessages();
    connect(userConnectedId, handleNewMessage, null);
  }, [routeId, senderId]);

  const handleSendMessage = () => {
    const { receiverId, senderMsgId } = determineReceiverAndSender();
    const messageSent = {
      content: message,
      senderId: senderMsgId,
      receiverId: receiverId,
      routeId: +routeId,
      timestamp: today,
    };
    sendMessage(messageSent);
    setMessages((prevMessages) => [...prevMessages, messageSent]);
    setMessage("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const getSenderId = (msg) => {
    return msg.sender && msg.sender.id ? msg.sender.id : msg.senderId;
  };

  const getMessageKey = (msg) => {
    return (
      msg.id ||
      `${msg.senderId}-${msg.receiverId}-${msg.content.substring(0, 5)}`
    );
  };

  const getSenderName = (msg) => {
    const senderId = getSenderId(msg);
    if (senderId === +userConnectedId) {
      return "";
    } else if (route && senderId === route.driver.id) {
      return route.driver.firstname;
    } else if (potentialPassenger) {
      return potentialPassenger.firstname;
    }
    return null;
  };

  return (
    <div className="chat-container container mt-5">
      {route && (
        <RouteItem
          route={route}
          style={{
            width: "50%",
            height: "25%",
            marginBottom: "50px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
      <div className="card">
        <div className="card-header text-center fw-bold text-color">
          Welcome to the Chat page
        </div>
        <div className="card-body message-section">
          {messages &&
            messages.map((msg) => (
              <div
                key={getMessageKey(msg)}
                className={`d-flex justify-content-${
                  getSenderId(msg) === +userConnectedId ? "end" : "start"
                } mb-3`}
              >
                <div
                  className={`message-container ${
                    getSenderId(msg) === +userConnectedId
                      ? "text-end"
                      : "text-start"
                  }`}
                >
                  <div className="sender-name text-color fw-bold">
                    {getSenderName(msg)}
                  </div>
                  <div
                    className={`message p-2 rounded ${
                      getSenderId(msg) === +userConnectedId
                        ? "bg-primary text-white"
                        : "border"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div id="passwordHelpBlock" className="form-text">
                    {dayjs(msg.timestamp).format("HH:mm")}{" "}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="card-footer input-section">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Please enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {route && (
          <Link
            to={`/routeDetails/${route.id}`}
            state={{ route: route }}
            key={route.id}
            className="btn btn-success"
          >
            Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default Chat;

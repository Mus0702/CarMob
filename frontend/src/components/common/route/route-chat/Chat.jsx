import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRouteById } from "../../../../service/route.js";
import { getMessages } from "../../../../service/message.js";
import {
  connect,
  disconnect,
  sendMessage,
} from "../../../../service/webSocket.js";
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
  const [messageChat, setMessageChat] = useState({});
  const today = new Date().toISOString();

  useEffect(() => {
    const fetchRoute = async () => {
      console.log("senderId " + senderId);
      try {
        const response = await getRouteById(routeId);
        setRoute(response.data);
        console.log({ response });
        if (response.data) {
          try {
            const userResponse = await getUserById(senderId);
            setPotentialPassenger(userResponse.data);
            console.log("potentiel passager ", userResponse.data);
            console.log("sender id " + senderId);
            let receiverId;
            let senderMsgId;
            if (Number(userConnectedId) === response.data.driver.id) {
              receiverId = response.data.driver.id;
              senderMsgId = Number(senderId);
            } else if (response.data) {
              receiverId = Number(userConnectedId);
              senderMsgId = response.data.driver.id;
            }

            const messageResponse = await getMessages(
              routeId,
              senderMsgId,
              receiverId,
            );
            console.log({ messageResponse });
            if (messageResponse.data.length > 0) {
              setMessages(messageResponse.data);
            } else {
              setMessage([]);
            }
          } catch (e) {
            console.log(e);
          }
          connect(userConnectedId, (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchRoute();
    return () => {
      disconnect();
    };
  }, [routeId, senderId]);

  const handleSendMessage = () => {
    let receiverId;
    let senderMsgId;
    if (route && Number(userConnectedId) === route.driver.id) {
      receiverId = Number(senderId);
      senderMsgId = Number(userConnectedId);
    } else {
      receiverId = route.driver.id;
      senderMsgId = Number(userConnectedId);
    }
    const messageSent = {
      content: message,
      senderId: senderMsgId,
      receiverId: receiverId,
      routeId: +routeId,
      timestamp: today,
    };

    // setMessageChat(messageSent);

    sendMessage(messageSent);
    setMessages((prevMessages) => [...prevMessages, messageSent]);

    setMessage("");
    messages.map((message) => {
      console.log({ message });
    });
  };

  /*
  deux structures différentes pour mes objets de message, selon qu'ils proviennent du backend pour la recuperation des messages
  ou qu'ils sont envoyés au backend pour la creation et sauvegarde d 'un message

 vérification pour déterminer si un objet de message a une structure "sender" ou "senderId".
 utiliser une fonction de helper qui renvoie l'ID approprié en fonction de la structure du message.

 fonction qui renvoie l'ID approprié pour un message donné et elle sera utilsé dans le rendu
   */
  const getSenderId = (msg) => {
    if (msg.sender && msg.sender.id) {
      return msg.sender.id;
    } else if (msg.senderId) {
      return msg.senderId;
    }
    return null;
  };
  /*
Utilisation d'une combinaison d'identifiants et d'autres propriétés : Si msg.id est undefined pour certains messages,  créer une clé basée sur une combinaison d'autres propriétés pour assurer l'unicité.
 */
  const getMessageKey = (msg) => {
    return (
      msg.id ||
      `${msg.senderId}-${msg.receiverId}-${msg.content.substring(0, 5)}`
    );
  };
  const getSenderName = (msg) => {
    const senderId = getSenderId(msg); // utilisez votre fonction existante pour obtenir l'ID du sender
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
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Envoyer
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

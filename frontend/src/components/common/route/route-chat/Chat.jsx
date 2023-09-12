import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRouteById } from "../../../../service/route.js";
import { getMessages } from "../../../../service/message.js";
import {
  connect,
  disconnect,
  sendMessage,
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
        console.log({ response });
        if (response.data) {
          try {
            const messageResponse = await getMessages(
              routeId,
              userConnectedId,
              response.data.driver.id,
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
  }, []);

  const handleSendMessage = () => {
    let receiver;

    if (!localStorage.getItem("lastSenderId")) {
      receiver = route.driver.id;
      localStorage.setItem("lastSenderId", userConnectedId);
    } else {
      if (Number(userConnectedId) === route.driver.id) {
        receiver = +localStorage.getItem("lastSenderId");
        //localStorage.setItem("lastSenderId", route.driver.id.toString());
      } else {
        receiver = route.driver.id;
        localStorage.setItem("lastSenderId", userConnectedId);
      }
    }
    const messageChat = {
      content: message,
      senderId: +userConnectedId,
      receiverId: receiver,
      routeId: +routeId,
    };
    sendMessage(messageChat);
    setMessages((prevMessages) => [...prevMessages, messageChat]);

    setMessage("");
    console.log("liste messages ", messages);
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
  return (
    <div className="chat-container container mt-5">
      <div className="card">
        <div className="card-header text-center fw-bold text-color">
          Welcome to the Chat page
        </div>
        <div className="card-body message-section">
          {messages.map((msg) => (
            <div
              key={getMessageKey(msg)}
              className={`d-flex justify-content-${
                getSenderId(msg) === +userConnectedId ? "end" : "start"
              } mb-3`}
            >
              <div
                className={`message p-2 rounded ${
                  getSenderId(msg) === +userConnectedId
                    ? "bg-primary text-white"
                    : "border"
                }`}
              >
                {msg.content}
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

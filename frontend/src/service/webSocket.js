import { API_URL } from "../utils/fetchAjax.js";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const serverUrl = `${API_URL}/chat`;
let stompClient = null;

export const connect = (userId, onMessageReceived, onNotificationReceived) => {
  stompClient = Stomp.over(() => new SockJS(serverUrl));
  stompClient.onStompError = (error) => {
    console.error("Erreur STOMP :", error);
  };

  const onConnect = () => {
    stompClient.subscribe(`/user/${userId}/private`, (message) => {
      console.log({ message });
      if (onMessageReceived) {
        onMessageReceived(JSON.parse(message.body));
      }
    });

    stompClient.subscribe(`/user/${userId}/notifications`, (notification) => {
      console.log({ notification });
      if (onNotificationReceived) {
        onNotificationReceived(JSON.parse(notification.body));
      }
    });
  };

  const onError = (error) => {
    console.error("Erreur de connexion WebSocket :", error);
  };

  stompClient.connect({}, onConnect, onError);
};

export const sendMessage = (message) => {
  if (!stompClient || !stompClient.connected) {
    console.error(
      "Le client STOMP n'est pas connecté. Impossible d'envoyer le message.",
    );
    return;
  }
  console.log({ message });
  stompClient.send("/app/chat", {}, JSON.stringify(message));
};

export const disconnect = () => {
  if (!stompClient || !stompClient.connected) {
    console.error(
      "Le client STOMP n'est pas connecté. Impossible de se déconnecter.",
    );
    return;
  }
  stompClient.disconnect(() => {
    console.log("Déconnecté du serveur WebSocket.");
  });
};

import { API_URL } from "../utils/fetchAjax.js";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const serverUrl = `${API_URL}/chat`;
let stompClient = null;

export const connect = (userId, onMessageReceived) => {
  stompClient = Stomp.over(() => new SockJS(serverUrl));
  stompClient.onStompError = (error) => {
    console.error("STOMP error :", error);
  };

  const onConnect = () => {
    stompClient.subscribe(`/user/${userId}/private`, (message) => {
      console.log({ message });
      onMessageReceived(JSON.parse(message.body));
    });
  };

  const onError = (error) => {
    console.error("WebSocket connexion error : ", error);
  };

  stompClient.connect({}, onConnect, onError);
};

export const sendMessage = (message) => {
  if (!stompClient || !stompClient.connected) {
    console.error("STOMP client not connected. Unable to send message.");
    return;
  }
  console.log({ message });
  stompClient.send("/app/chat", {}, JSON.stringify(message));
};

export const disconnect = () => {
  if (!stompClient || !stompClient.connected) {
    console.error("STOMP client not connected. Unable to disconnect.");
    return;
  }
  stompClient.disconnect(() => {
    console.log("Disconnected from WebSocket server.");
  });
};

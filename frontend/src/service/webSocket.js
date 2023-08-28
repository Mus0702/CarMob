import { API_URL } from "../utils/fetchAjax.js";
import { WebSocket } from "vite";

const serverUrl = `${API_URL}/chat`;
let stompClient;

export const connect = (onMessageReceived) => {
  const socket = new WebSocket(serverUrl);
};

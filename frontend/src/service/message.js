import { fetchAjax } from "../utils/fetchAjax.js";

export const getMessages = async (routeId, user1Id, user2Id) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(
    `/conversation?routeId=${routeId}&user1Id=${user1Id}&user2Id=${user2Id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const getAllUnReadMessages = async (receiverId) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(
    `/notifications/allUnreadMessages?receiverId=${receiverId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};
export const updateStatus = async (message) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.put("/message", message, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

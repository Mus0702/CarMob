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

import { fetchAjax } from "../utils/fetchAjax.js";

export const createRating = async (rating) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.post("/rating", rating, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const hasRated = async (routeId, driverId, passengerId) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(
    `/rating/hasRated?routeId=${routeId}&driverId=${driverId}&passengerId=${passengerId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

import { fetchAjax } from "../utils/fetchAjax.js";

export const createRating = async (rating) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.post("/rating", rating, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

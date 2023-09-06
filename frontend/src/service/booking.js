import { fetchAjax } from "../utils/fetchAjax.js";

export const createBooking = async (booking) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.post("/booking", booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

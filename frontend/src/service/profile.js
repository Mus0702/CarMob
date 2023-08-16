import { fetchAjax } from "../utils/fetchAjax.js";

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

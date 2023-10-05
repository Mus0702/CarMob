import { fetchAjax } from "../utils/fetchAjax.js";

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(`/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserByMail = async (mail) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(`/user/getUser/${mail}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

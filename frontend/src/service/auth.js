import { fetchAjax } from "../utils/fetchAjax.js";

export const sendLoginRequest = async (credentials) => {
  return await fetchAjax.post("/auth/login", credentials);
};
export const register = async (data) => {
  return await fetchAjax.post("/auth/register", data);
};

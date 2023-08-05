import { fetchAjax } from "../utils/fetchAjax.js";

export const sendLoginRequest = async (credentials) => {
  return await fetchAjax.post("/auth/login", credentials);
};
export const registerService = async (data) => {
  return await fetchAjax.post("/auth/register", data);
};
export const isEmailExist = async (email) => {
  return await fetchAjax.get(`/user/check-email?email=${email}`);
};

import axios from "axios";

export const API_URL = import.meta.env.VITE_API_PREFIX_URL;

export const fetchAjax = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

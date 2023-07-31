import axios from "axios";

const API_URL = import.meta.env.VITE_API_PREFIX_URL;

export const fetchAjax = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const fetchAjaxPrivate = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

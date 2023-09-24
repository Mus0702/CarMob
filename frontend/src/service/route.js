import { fetchAjax } from "../utils/fetchAjax.js";

export const getSearchRoutes = async (params) => {
  return await fetchAjax.get("/route/search", {
    params: {
      departureAddress: params.departureAddress,
      arrivalAddress: params.arrivalAddress,
      departureDate: params.departureDate,
      numberOfSeats: params.numberOfSeats,
      page: params.page,
    },
  });
};
export const getRouteByIdNotAuth = async (id) => {
  return await fetchAjax.get(`/route/notAuth/${id}`);
};

export const getRouteById = async (id) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(`/route/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMyRoutes = async (userId) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.get(`/route/routes/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const saveRoute = async (route) => {
  const token = localStorage.getItem("token");
  return await fetchAjax.post("/route", route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

import { fetchAjax } from "../utils/fetchAjax.js";

export const getSearchRoutes = async (params) => {
  return await fetchAjax.get("/route/search", {
    params: {
      departureAddress: params.departureAddress,
      arrivalAddress: params.arrivalAddress,
      departureDate: params.departureDate,
      numberOfSeats: params.numberOfSeats,
    },
  });
};

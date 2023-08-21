import { fetchAjax } from "../utils/fetchAjax.js";

export const getLatLng = async (params) => {
  return await fetchAjax.get("/getLatLng", {
    params: {
      address: params.address,
    },
  });
};

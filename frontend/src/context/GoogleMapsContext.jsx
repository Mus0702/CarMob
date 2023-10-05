import React, { createContext, useContext, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const GoogleMapsContext = createContext();

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
const GOOGLE_MAPS_LIBRARIES = ["places"];

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

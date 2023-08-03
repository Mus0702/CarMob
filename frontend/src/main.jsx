import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Myapp from "./components/app/App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "react-date-picker/dist/DatePicker.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("car-mob")).render(
  <React.StrictMode>
    <Myapp />
  </React.StrictMode>,
);

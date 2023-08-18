import ReactDOM from "react-dom/client";
import "./index.scss";
import Myapp from "./components/app/App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "react-date-picker/dist/DatePicker.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("car-mob")).render(
  <AuthProvider>
    <Myapp />
  </AuthProvider>,
);

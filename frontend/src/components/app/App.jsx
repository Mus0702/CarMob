import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import Nav from "../common/nav/Nav.jsx";
import LoginPage from "../../pages/login-page/LoginPage.jsx";
import HomePage from "../../pages/user-pages/home-page/HomePage.jsx";
import RegisterPage from "../../pages/user-pages/register-page/RegisterPage.jsx";
import AdminHomePage from "../../pages/admin-pages/admin-home-page/AdminHomePage.jsx";
export default function Myapp() {
  return (
    <>
      {/*<Navigation/>*/}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/*<Route path="/people/:nationality?" element={<People/>}/>*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

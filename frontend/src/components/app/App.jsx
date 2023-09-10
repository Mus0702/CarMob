import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import Nav from "../common/nav/Nav.jsx";
import LoginPage from "../../pages/login-page/LoginPage.jsx";
import HomePage from "../../pages/user-pages/home-page/HomePage.jsx";
import RegisterPage from "../../pages/user-pages/register-page/RegisterPage.jsx";
import AdminHomePage from "../../pages/admin-pages/admin-home-page/AdminHomePage.jsx";
import RoutesResultsPage from "../../pages/routes-results-page/RoutesResultsPage.jsx";
import ProfilePage from "../../pages/auth-pages/ProfilePage.jsx";
import RequiredAuth from "../protected-pages/RequiredAuth.jsx";
import RestrictedPage from "../../pages/restricted-page/RestrictedPage.jsx";
import RequiredAdminRole from "../protected-pages/RequiredAdminRole.jsx";
import RouteDetails from "../common/route/route-details/RouteDetails.jsx";
import ChatPage from "../../pages/chat-page/ChatPage.jsx";
import MessageSuccessPage from "../../pages/message-success-page/MessageSuccessPage.jsx";
import RatingPage from "../../pages/rating-page/RatingPage.jsx";
export default function Myapp() {
  return (
    <>
      {/*<Navigation/>*/}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<RequiredAdminRole />}>
            <Route path="/admin" element={<AdminHomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/route-results" element={<RoutesResultsPage />} />
          <Route path="/routeDetails/:routeId" element={<RouteDetails />} />
          <Route element={<RequiredAuth />}>
            <Route path="/chat/:routeId" element={<ChatPage />} />
          </Route>
          <Route element={<RequiredAuth />}>
            <Route path="/message-success" element={<MessageSuccessPage />} />
          </Route>
          {/*<Route element={<RequiredAuth />}>*/}
          <Route path="/rating/:routeId" element={<RatingPage />} />
          {/*</Route>*/}
          <Route element={<RequiredAuth />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          {/*<Route element={<RequiredAuth/>}>*/}
          {/*  *mettre ici la page où le user doit etre connecté*/}
          {/*</Route>*/}
          <Route path="/restricted" element={<RestrictedPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./Nav.css";
import { useAuth } from "../../../hooks/useAuth.jsx";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCirclePlus,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const userConnect = JSON.parse(sessionStorage.getItem("userConnected"));

  const onRedirect = () => {
    navigate("/");
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("connectedUserId");
    sessionStorage.removeItem("userConnected");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar main-navbar navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand" to="#" onClick={onRedirect}>
          <div className="d-flex align-items-center">
            <img style={{ maxWidth: "40px" }} src={Logo} alt="Logo carMob" />
            <span className="carMob-brand">CarMob</span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              userConnect && userConnect.car ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-route">
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        style={{ color: "#1f5129" }}
                      />{" "}
                      Publish a route
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#1f5129", marginBottom: "2px" }}
                      />{" "}
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={onLogout}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ color: "#1f5129" }}
                      />{" "}
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#1f5129", marginBottom: "2px" }}
                      />{" "}
                      Profile Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={onLogout}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ color: "#2e511f" }}
                      />{" "}
                      Logout
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon
                      icon={faArrowRightToBracket}
                      style={{ color: "#2e511f" }}
                    />{" "}
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      style={{ color: "#2e511f", marginBottom: "1px" }}
                    />{" "}
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

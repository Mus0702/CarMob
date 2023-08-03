import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar main-navbar navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand" to="#">
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
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

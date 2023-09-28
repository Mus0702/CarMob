import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./Nav.css";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { getAllUnReadMessages } from "../../../service/message.js";
import { updateStatus } from "../../../service/message.js";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBell,
  faCirclePlus,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  // const userConnect = JSON.parse(sessionStorage.getItem("userConnected"));
  const userConnect = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("userConnected"));
  }, [sessionStorage.getItem("userConnected")]);

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState("");
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set());

  const fetchUnreadMessagesFromAPI = async () => {
    try {
      const response = await getAllUnReadMessages(userConnect.id);
      console.log({ response });
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  const groupMessagesBySender = (messages) => {
    return messages.reduce((acc, message) => {
      if (!acc[message.sender.id]) {
        acc[message.sender.id] = {
          count: 0,
          sender: message.sender.firstname,
          routeId: message.route.id,
          messages: [],
          latestTimestamp: null,
        };
      }
      acc[message.sender.id].count += 1;
      acc[message.sender.id].messages.push(message);

      if (
        !acc[message.sender.id].latestTimestamp ||
        message.timestamp > acc[message.sender.id].latestTimestamp
      ) {
        acc[message.sender.id].latestTimestamp = message.timestamp;
      }
      return acc;
    }, {});
  };

  const fetchUnReadMessages = async () => {
    console.log("user id = " + userConnect.id);
    if (isLoggedIn && userConnect) {
      const response = await fetchUnreadMessagesFromAPI();
      console.log({ response });
      setMessages(response);
      const groupedBySender = groupMessagesBySender(response);

      const sortedGroups = Object.values(groupedBySender).sort((a, b) => {
        return new Date(b.latestTimestamp) - new Date(a.latestTimestamp);
      });
      setGroupedMessages(sortedGroups);
      setUnreadMessagesCount(response.length);
    }
  };

  const handleItemClick = async (group) => {
    console.log({ group });
    setUnreadMessagesCount(unreadMessagesCount - group.count);
    try {
      for (const message of group.messages) {
        await updateStatus(message);
      }
      navigate(`/chat/${group.routeId}/${group.messages[0].sender.id}`);
    } catch (e) {
      console.log(e);
    }
    setReadNotifications((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(group.messages[0].sender.id);
      return newSet;
    });
  };

  useEffect(() => {
    fetchUnReadMessages();
  }, [isLoggedIn, userConnect]);

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
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      id="notificationsDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faBell} />
                      {unreadMessagesCount > 0 && (
                        <span className="badge bg-danger">
                          {unreadMessagesCount}
                        </span>
                      )}
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="notificationsDropdown"
                    >
                      {groupedMessages.map((group, index) => (
                        <li key={index}>
                          <a
                            className={`dropdown-item ${
                              readNotifications.has(group.messages[0].sender.id)
                                ? ""
                                : "fw-bold"
                            }`}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemClick(group);
                            }}
                          >
                            You have {group.count} unread message(s) from{" "}
                            {group.sender} about route {group.routeId}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-routes">
                      My routes
                    </Link>
                  </li>
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
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      id="notificationsDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faBell} />
                      {unreadMessagesCount > 0 && (
                        <span className="badge bg-danger">
                          {unreadMessagesCount}
                        </span>
                      )}
                    </span>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="notificationsDropdown"
                    >
                      {groupedMessages.map((group, index) => (
                        <li key={index}>
                          <a
                            className={`dropdown-item ${
                              readNotifications.has(group.messages[0].sender.id)
                                ? ""
                                : "fw-bold"
                            }`}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemClick(group);
                            }}
                          >
                            You have {group.count} unread message(s) from{" "}
                            {group.sender} about route {group.routeId}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-routes">
                      My routes
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

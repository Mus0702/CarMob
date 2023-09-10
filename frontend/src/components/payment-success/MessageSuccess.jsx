import "./MessageSuccess.css";
import { Link } from "react-router-dom";

const MessageSuccess = ({ message }) => {
  return (
    <div className="container">
      <div className="success-message text-color ">
        <h2 className="text-color">{message}</h2>
        <p className="para">Thank you for choosing CarMob.</p>
        <Link to="/" className="btn btn-success">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default MessageSuccess;

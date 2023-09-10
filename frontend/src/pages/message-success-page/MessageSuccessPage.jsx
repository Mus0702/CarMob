import MessageSuccess from "../../components/payment-success/MessageSuccess.jsx";
import { useLocation } from "react-router-dom";
const MessageSuccessPage = () => {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <div>
      <MessageSuccess message={message} />
    </div>
  );
};

export default MessageSuccessPage;

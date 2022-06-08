import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
const Message = ({ messageData }) => {
  const { currentUser } = useAuth();
  const { state } = useAppContext();
  const messageRef = useRef();
  const filterMessages = () => {
    if (!currentUser) {
      return "message-other";
    } else if (currentUser) {
      if (messageData.userData.userId === currentUser.uid) {
        return "my-message";
      } else {
        return "message-other";
      }
    }
  };
  useEffect(() => {
    let msg = document.querySelector(".dummy-message");
    if (msg) {
      msg.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);
  const filterName = () => {
    if (currentUser) {
      if (messageData.userData.userId === currentUser.uid) {
        return "You";
      } else {
        return messageData.userData.displayName;
      }
    } else {
      return messageData.userData.displayName;
    }
  };
  return (
    <div ref={messageRef} className={`message ${filterMessages()}`}>
      <span>{filterName()}</span>
      <p>{messageData.text}</p>
    </div>
  );
};

export default Message;

import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { addDoc } from "firebase/firestore";
import { messagesRef } from "../firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";
const MessageInput = () => {
  const { currentUser } = useAuth();
  const { state, dispatch } = useAppContext();
  const msgTextRef = useRef();
  const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
  const handleSendMessage = () => {
    if (
      !msgTextRef.current.value ||
      msgTextRef.current.value.trim().length === 0
    ) {
      msgTextRef.current.value = "";
      dispatch({ type: "SET_MODAL_TEXT", payload: "Please enter any text!!!" });
    } else {
      setSendBtnDisabled(true);
      addDoc(messagesRef, {
        text: msgTextRef.current.value,
        createdAt: serverTimestamp(),
        userData: {
          displayName: currentUser.displayName,
          email: currentUser.email,
          userId: currentUser.uid,
        },
      }).then(() => {
        msgTextRef.current.value = "";
        setSendBtnDisabled(false);
      });
      msgTextRef.current.value = "";
    }
  };

  return (
    <div className="rounded-md">
      <div className="absolute rounded-md left-0 right-0 bottom-0 bg-white">
        <div className="px-4 py-2">
          {!currentUser ? (
            <div className="text-black text-xs md:text-base px-4 py-4 md:py-2 border-2 text-center border-gray-400 rounded-md">
              Please Login or Sign Up to send a message.
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                disabled={sendBtnDisabled}
                ref={msgTextRef}
                placeholder="Say Something Nice"
                type="text"
                className="w-full py-2 px-4 text-gray-700 border-2 border-gray-400 rounded-md outline-none focus:border-gray-600"
              />
              <button
                disabled={sendBtnDisabled}
                onClick={handleSendMessage}
                className="btn-blue "
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

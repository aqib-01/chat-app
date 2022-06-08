import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useAppContext } from "../context/AppContext";
import { messagesRef } from "../firebase/firebaseConfig";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import SpinnerLoading from "../components/loading/SpinnerLoading";

const ChatRoom = () => {
  const { state, dispatch } = useAppContext();
  const [messagesLoading, setMessagesLoading] = useState(false);
  const dummyRef = useRef();
  useEffect(() => {
    setMessagesLoading(true);
    const q = query(messagesRef, orderBy("createdAt"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.docs.length > 0) {
        let messagesData = [];

        snap.docs.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });

        dispatch({ type: "SET_ALL_MESSAGES", payload: messagesData });
        setMessagesLoading(false);
      } else {
        dispatch({ type: "SET_ALL_MESSAGES", payload: [] });
        setMessagesLoading(false);
      }
    });

    return () => unsub;
  }, []);

  return (
    <div className=" wrapper relative z-10">
      <div className="chat-room py-2 rounded-md">
        <div
          className="bg-white shadow-md h-full rounded-md overflow-y-auto 
        overflow-x-hidden px-4 py-4"
        >
          {!messagesLoading ? (
            <>
              <div className="grid  gap-3">
                {state.messages.map((msg) => (
                  <Message key={msg.id} messageData={msg} />
                ))}
              </div>
              <div ref={dummyRef} className="dummy-message"></div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <SpinnerLoading />
            </div>
          )}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;

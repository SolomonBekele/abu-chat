import React, { memo, useRef, useEffect } from "react";
import Message from "./Message";
import MessageShimmer from "../Skeleton/MessageShimmer";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface MessagesProps {
  conversationId: string ; // Pass the selected user ID as prop
}

const Messages: React.FC<MessagesProps> = ({ conversationId }) => {

  const { data, loading, error } = useSelector(
    (state: RootState) => state.messages
  );
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Scroll to last message when messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data[conversationId]]);
  const userMessages = data[conversationId] || [];
 
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && userMessages.length > 0 &&
        userMessages.map((message) => (
          <div key={message._id} ref={lastMessageRef} className="mb-2">
            <Message key={message._id} {...message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageShimmer key={idx} />)}

      {!loading && userMessages.length === 0 && (
        <p className=" text-gray-400 flex justify-center ">
          Send a message to start a conversation
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default memo(Messages);

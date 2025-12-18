import React, { memo, useRef, useEffect } from "react";
import Message from "./Message";
import MessageShimmer from "../Skeleton/MessageShimmer";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface MessagesProps {
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ conversationId }) => {
  const { data, loading, error } = useSelector((state: RootState) => state.messages);
  const containerRef = useRef<HTMLDivElement>(null);

  const userMessages = data[conversationId] || [];

  // Scroll to bottom immediately on mount or when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [userMessages.length]);

  return (
    <div ref={containerRef} className="flex flex-col h-full px-4 overflow-auto">
      {!loading && userMessages.length > 0 &&
        userMessages.map((message) => (
          <div key={message._id} className="mb-2">
            <Message {...message} />
          </div>
        ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageShimmer key={idx} />)}

      {!loading && userMessages.length === 0 && (
        <p className="text-gray-400 flex justify-center">
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

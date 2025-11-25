import React, { useEffect } from "react";
import { SearchBarInput } from "../../ui/Input/UsersBarInput";
import { Conversation } from "./Conversation";
import UserButtonShimmer from "../Skeleton/Shimmer";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../../store/Conversations/conversationThunk";

const Conversations: React.FC = () => {
 const dispatch = useDispatch<AppDispatch>();
  const { conversations, status, error } = useSelector((state: RootState) => state.conversations);

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  return (
    <>
      {/* Header */}
      <div className="p-4">
        <h2 className="mb-4 hidden md:block">Messages</h2>
        <SearchBarInput />
      </div>

      {/* Scroll Area */}
      <div className="relative flex-1">
        <div className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1">
          <div className="p-2">
            {status === "loading"
              ? Array.from({ length: 5 }).map((_, i) => <UserButtonShimmer key={i} />)
              : status === "failed"
              ? <p className="text-red-500">{error}</p>
              : conversations.map((conversation) => {
                  return <Conversation key={conversation.id} {...conversation} />
})}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversations;

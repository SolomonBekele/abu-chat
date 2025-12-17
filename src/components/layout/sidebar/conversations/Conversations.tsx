import React, { useEffect } from "react";
import { SearchBarInput } from "../../../ui/Input/UsersBarInput";
import { Conversation } from "./Conversation";
import UserButtonShimmer from "../../Skeleton/Shimmer";
import type { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../../../store/Conversations/conversationThunk";

const Conversations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { conversations, status, error, selectedConversation } = useSelector(
    (state: RootState) => state.conversations
  );

  const activeId = selectedConversation?.id ?? null;

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
        <div className="p-2">
          {status === "loading" ? (
            Array.from({ length: 5 }).map((_, i) => (
              <UserButtonShimmer key={i} />
            ))
          ) : status === "failed" ? (
            <p className="text-red-500">{error}</p>
          ) : (
            conversations.map((conversation) => (
              <Conversation
                key={conversation.id}
                {...conversation}
                isActive={activeId === conversation.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Conversations;

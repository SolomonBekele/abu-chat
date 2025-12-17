import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { setSelectedConversation } from "../store/Conversations/conversationSlice";
import { fetchMessages } from "../store/Messages/messageThunk";
import { BASE_URL, CHAT_API, VERSION } from "../utils/constants";

export const useFetchConversation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchConversationByUserId = async (userId: string) => {
    try {
      const token = localStorage.getItem("user-token");

      const res = await fetch(
        `${BASE_URL}${VERSION}${CHAT_API}/conversation/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch conversation");

      const data = await res.json();

      if (data?.conversation?.conversationInfo?._id) {
        dispatch(fetchMessages(data.conversation.conversationInfo._id));
      }

      dispatch(setSelectedConversation(data.conversation));
    } catch (error) {
      console.error("Fetch conversation error:", error);
    }
  };

  return { fetchConversationByUserId };
};

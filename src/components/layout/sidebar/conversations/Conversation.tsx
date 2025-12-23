import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { fetchMessages } from "../../../../store/Messages/messageThunk";
import { setSelectedConversation } from "../../../../store/Conversations/conversationSlice";
import { formatTimeAgo } from "../../../../utils/formatTime";

export interface ConversationProps {
  id: string;
  role: "member" | "admin";
  joined_at: string;
  last_read_message_id: string | null;
  unreadMessage: number;
  conversationInfo: ConversationInfo;
  peerUser: PeerUser;
  isActive:boolean
}

// Conversation info
export interface ConversationInfo {
  _id: string;
  type: "one-to-one" | "group";
  created_at: string;
  updated_at: string;
  lastMessage: string | null;
  lastMessageType: "text" | "image" | "video" | "file" | null;
  lastMessageTime: Date;
}

// Peer user (for one-to-one chats)
export interface PeerUser {
  user_id: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  profile_pic: string | "";
  lastSeen: string;
  success: boolean;
}

export const Conversation = ({
  id,
  role,
  joined_at,
  last_read_message_id,
  unreadMessage,
  conversationInfo,
  peerUser,
  isActive
}: ConversationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddMessages = (conversationId: string) => {
    const conversation = {
      id,
      role,
      joined_at,
      last_read_message_id,
      unreadMessage,
      conversationInfo,
      peerUser,
    };
    dispatch(fetchMessages(conversationId));
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <button
      onClick={() => handleAddMessages(conversationInfo._id)}
      className={`w-full p-3 rounded-lg text-left flex items-start gap-3 transition-colors 
        ${isActive ? "bg-teal-50" : "hover:bg-gray-50"}`}
    >
      {/* Avatar */}
      <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square size-full"
          alt={peerUser.name}
          src={peerUser?.profile_pic}
        />
      </span>

      <div className="flex-1 min-w-0">
        {/* Name + time */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-900 truncate">{peerUser.name}</span>
          <span className="text-xs text-gray-500">{formatTimeAgo(conversationInfo.lastMessageTime)}</span>
        </div>

        {/* Message + unread badge */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate">{conversationInfo.lastMessage}</p>

          {unreadMessage> 0 && (
            <span className="inline-flex items-center justify-center rounded-md py-0.5 font-medium ml-2 bg-teal-500 text-xs px-2 text-white">
              {unreadMessage}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

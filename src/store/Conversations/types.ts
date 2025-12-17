// Root response


// Participant (one row in chat list)
export interface Conversations {
  id: string;
  role: "member" | "admin";
  joined_at: string;
  last_read_message_id: string | null;
  unreadMessage: number;
  conversationInfo: ConversationInfo;
  peerUser: PeerUser;
}

// Conversation info
export interface ConversationInfo {
  _id: string;
  type: "one-to-one" | "group";
  created_at: string;
  updated_at: string;
  lastMessage: string | null;
  lastMessageType: "text" | "image" | "video" | "file" | null;
  lastMessageTime: string;
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


export interface ConversationsState {
  conversations: Conversations[];
  status: "idle" | "loading" | "failed";
  success: boolean;
  selectedConversation: Conversations | null;
  error?: string;
}


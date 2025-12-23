// Root response

export interface ConversationsRespponse{
  success:string;
  message:string;
  data:Conversation[]
}


// Participant (one row in chat list)
export interface Conversation {
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


export interface ConversationsState {
  data: Record<string,Conversation>;
  status: "idle" | "loading" | "failed";
  success: boolean;
  selectedConversation: Conversation | null;
  error?: string;
}



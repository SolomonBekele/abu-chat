export interface ConversationsState {
  conversations: Array<any>;
  isConversationsFetched: boolean;
  getConversationsLoading: boolean;
  isConversationsUpdated: boolean;
  isConversationsDeleted: boolean;
}

export interface Contact {
  id: number;
  name: string;
  profile_picture: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
}

export interface ContactsState {
  contacts: Contact[];
  status: "idle" | "loading" | "failed";
  selectedConversation: Contact | null;
  error?: string;
}
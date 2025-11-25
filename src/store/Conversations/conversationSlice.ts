import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations } from "./conversationThunk";

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
}

interface ConversationsState {
  conversations: Conversation[];
  status: "idle" | "loading" | "failed";
  selectedConversation: Conversation | null;
  error?: string;
}

const initialState: ConversationsState = {
  conversations: [],
  status: "idle",
  selectedConversation: null,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<Conversation>) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
        state.status = "idle";
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations} from "./conversationThunk";
import type { Conversations, ConversationsState } from "./types";


const initialState: ConversationsState = {
  conversations: [],
  status: "idle",
  success: false,
  selectedConversation:  null,
};

const conversationsSlice = createSlice({
  name: "conversationsList",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<Conversations>) => {
      state.selectedConversation = action.payload;
    },
    resetConversation(state) {
          state.conversations = [];
          state.status = "idle";
          state.selectedConversation = null
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<Conversations[]>) => {
        state.status = "idle";
        state.conversations = action.payload.data;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedConversation,resetConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;

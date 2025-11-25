// messageSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages } from "./messageApi";

// Message Interface
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  seenBy: string[];
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface MessagesState {
  messages: Record<string, Message[]>; 
  loading: boolean;   // <-- BOOLEAN
  error?: string;
}

const initialState: MessagesState = {
  messages: {},
  loading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ userId: number; message: Message }>
    ) => {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      state.messages[userId].push(message);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true; // <-- boolean
      })
      .addCase(
        fetchMessages.fulfilled,
        (
          state,
          action: PayloadAction<{ userId: string; messages: Message[] }>
        ) => {
          state.loading = false;
          state.messages[action.payload.userId] =
            action.payload.messages;
        }
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

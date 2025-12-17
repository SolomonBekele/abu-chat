// messageSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages } from "./messageThunk";
import type { Message, messagesState } from "./types";

// Message Interface


const initialState: messagesState = {
  success:false,
  message:"",
  data: {},
  loading: false,

};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ conversation_id: number; message: Message }>
    ) => {
      const { conversation_id, message } = action.payload;
      if (!state.data[conversation_id]) {
        state.data[conversation_id] = [];
      }
      state.data[conversation_id].push(message);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true; // <-- boolean
      })
      .addCase(fetchMessages.fulfilled, ( state,action: PayloadAction<{ conversationId: string; messages: Message[] }>
        ) => {
          state.loading = false;
          state.data[action.payload.conversationId] =action.payload.data.data;
          state.message = action.payload.data.message
          state.success = action.payload.data.success
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

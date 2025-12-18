// messageSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages } from "./messageThunk";
import type { Message, MessagesRespponse, messagesState } from "./types";

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
    addMessage: (state,action: PayloadAction<{ conversationId: string; message: Message }>) => {
      const { conversationId, message } = action.payload;
      state.data[conversationId].push(message);
    },
    resetMessages(state) {
          state.data = {};
          state.message = "";
          state.loading = false;
          state.error = "";
        },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true; // <-- boolean
      })
      .addCase(fetchMessages.fulfilled, ( state,action: PayloadAction<MessagesRespponse>
        ) => {
      
          state.loading = false;
          state.data[action.payload.conversationId] = action.payload.data
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

export const { addMessage,resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

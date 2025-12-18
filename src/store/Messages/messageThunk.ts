import { createAsyncThunk } from "@reduxjs/toolkit";


import type { Message } from "./types";
import { BASE_URL, CHAT_API, VERSION } from "../../utils/constants";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
async (conversationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${VERSION}${CHAT_API}/message/${conversationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch messages");
      }
      const res = await response.json()
      const data: Message[] = res.data;
      return { conversationId, data: data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },

  // ----------- Prevent API call if already loaded -----------
  {
    condition: (conversationId, { getState }) => {
      const state = getState() as any;
      const existing = state.messages.data[conversationId];

      if (existing && existing.length > 0) {
        console.log("Redux already has messages for this user → skip API call");
        return false;
      }

      return true;
    },
  }
);
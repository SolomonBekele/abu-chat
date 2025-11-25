import { createAsyncThunk } from "@reduxjs/toolkit";


import type { Message } from "./messageSlice";
import { LOCAL_URL, MESSAGE_API } from "../../utils/constants";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_URL}${MESSAGE_API}${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch messages");
      }

      const data: Message[] = await response.json();

      return { userId, messages: data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },

  // ----------- Prevent API call if already loaded -----------
  {
    condition: (userId, { getState }) => {
      const state = getState() as any;
      const existing = state.messages.messages[userId];

      if (existing && existing.length > 0) {
        console.log("Redux already has messages for this user → skip API call");
        return false;
      }

      return true;
    },
  }
);

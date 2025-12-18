import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationsRespponse } from "./types";
import { BASE_URL, CHAT_API, VERSION } from "../../utils/constants";


// Fetch all conversations
export const fetchConversations = createAsyncThunk<ConversationsRespponse>(
  "conversationsList/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${VERSION}${CHAT_API}/conversation/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`, // 
        },
      });
        
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch conversations");
      }
      const data: ConversationsRespponse = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

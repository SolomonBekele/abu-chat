import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Conversation } from "./conversationSlice";
import { LOCAL_URL, USER_API } from "../../utils/constants";


// Fetch all conversations
export const fetchConversations = createAsyncThunk<Conversation[]>(
  "conversations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LOCAL_URL}${USER_API}`, {
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
      const data: Conversation[] = await response.json();
      
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

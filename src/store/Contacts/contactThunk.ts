import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Contact } from "./type";
import { BASE_URL, USER_PROFILE_API, VERSION } from "../../utils/constants";


// Fetch all conversations
export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}/contact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`, // 
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch contacts");
      }
      const data: Contact[] = await response.json();
      
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactThunk";
import type { Contact, ContactsState } from "./type";




const initialState: ContactsState = {
  contacts: [],
  status: "idle",
  selectedConversation: null,
};

const conversationsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<Contact>) => {
      state.selectedConversation = action.payload;
    },
    resetContact(state) {
          state.contacts = [];
          state.status = "idle";
          state.selectedConversation = null
        },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.status = "idle";
        state.contacts = action.payload.users;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedConversation,resetContact } = conversationsSlice.actions;
export default conversationsSlice.reducer;

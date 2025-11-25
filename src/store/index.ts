import { configureStore, } from "@reduxjs/toolkit";
import userReducer from "./Profile/userSlice"; // adjust path
import conversationsReducer from "./Conversations/conversationSlice";
import messageReducer from "./Messages/messageSlice"



export const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
    messages: messageReducer
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

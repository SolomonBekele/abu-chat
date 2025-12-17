import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./Profile/userSlice";
import conversationsReducer from "./Conversations/conversationSlice";
import contactsReducer from "./Contacts/contactSlice";
import messageReducer from "./Messages/messageSlice";


import {
  userPersistConfig,
  conversationsPersistConfig,
  contactsPersistConfig,

} from "./persistConfig";

 
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  conversations: persistReducer(conversationsPersistConfig, conversationsReducer),
  contact: persistReducer(contactsPersistConfig,contactsReducer),
  messages:  messageReducer,
});
 
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 
export const persistor = persistStore(store);
 
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
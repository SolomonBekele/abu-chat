import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations} from "./conversationThunk";
import type { Conversation, ConversationsState,ConversationsRespponse } from "./types";


const initialState: ConversationsState = {
  data: {},
  status: "idle",
  success: false,
  selectedConversation:  null,
};

const conversationsSlice = createSlice({
  name: "conversationsList",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<Conversation>) => {
      state.selectedConversation = action.payload;
    },
    resetConversation(state) {
          state.data = {};
          state.status = "idle";
          state.selectedConversation = null
    },
    updateConversation: (state,action: PayloadAction<{ conversationId: string; content: string ,lastMessageTime:Date,type:"text" | "image" | "video" | "file" | null}>) => {
          const { conversationId, content,type,lastMessageTime } = action.payload;
          state.data[conversationId].conversationInfo.lastMessage=content;
          state.data[conversationId].conversationInfo.lastMessageType= type ;
          state.data[conversationId].conversationInfo.lastMessageTime= lastMessageTime 
        },
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationsRespponse>) => {
        state.status = "idle";
        for(const data of action.payload.data){
            state.data[data.conversationInfo._id] = data;
        }
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedConversation,resetConversation,updateConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;

import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/Messages/messageSlice';
import type { Dispatch } from "redux";
import { updateConversation } from '../store/Conversations/conversationSlice';

export interface MessageType {
  _id: string;
  conversation_id: string;
  sender_id: string;
  type: "text" | "image" | "video" | "file";
  content: string;
  media_url: string | null;
  delivered_at: string | null;
  read_at: string | null;
  deleted: boolean;
  reply_to_message_id: string | null;
  sent_at: string;
  updated_at?: string;
  __v: number;
}

interface NewMessagePayload {
  conversationId: string;
  message: MessageType;
}

const useListenSentMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload: NewMessagePayload) => {
      console.log("Received message:new:", payload);

      const { conversationId, message } = payload;
      if (!conversationId || !message) return;

      dispatch(addMessage({ conversationId, message }));
      
      const updateConversationProps = {
        conversationId,
        content: message.content,
        lastMessageTime: new Date(message.sent_at),
        type: message.type
      };
      dispatch(updateConversation(updateConversationProps));

    //   const sound = new Audio(notificationSound);
    //   sound.play();
    };

    socket.on("message:send_success", handleNewMessage);

    return () => {
      socket.off("message:send_success", handleNewMessage);
    };
  }, [socket, dispatch]);
};

export default useListenSentMessages;

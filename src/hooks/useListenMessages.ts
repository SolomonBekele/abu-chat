import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/Messages/messageSlice';
import type { Dispatch } from "redux";

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

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return; // wait until socket is connected

    console.log("Listening for newMessage events...");

    const handleNewMessage = (payload: NewMessagePayload, callback?: (ack: string) => void) => {
      console.log("Received newMessage payload:", payload);

      const { conversationId, message } = payload;
      if (!conversationId || !message) {
        console.warn("Invalid payload:", payload);
        return;
      }

      // Keep conversation_id as string
      const conversation_id = Number(conversationId)

      // Dispatch to Redux
      dispatch(addMessage({ conversation_id, message }));

      // Play notification sound
      const sound = new Audio(notificationSound);
      sound.play();

      if (callback) callback("Received successfully");
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
};

export default useListenMessages;


export const handleNewMessage = (
  payload: NewMessagePayload,
  dispatch: Dispatch,
  callback?: (ack: string) => void
) => {

  const { conversationId, message } = payload;
  if (!conversationId || !message) {
    console.warn("Invalid payload:", payload);
    return;
  }

  // Keep conversation_id as number if your store expects number
  const conversation_id = conversationId;

  // Dispatch to Redux
  dispatch(addMessage({ conversation_id, message }));

  // Play notification sound
//   const sound = new Audio(notificationSound);
//   sound.play();

  if (callback) callback("Received successfully");
};
import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { extractTime } from "../../../utils/extractTime";

interface MessagesProps {
  _id: string;
  conversation_id: string;
  sender_id: string;
  type: "text" | "image" | "video" | "file"; // extend if needed
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

const Message = ({

  sender_id,
  type,
  content,
  media_url,
  delivered_at,
  read_at,
  deleted,
  reply_to_message_id,
  sent_at,
  updated_at,
  __v
}: MessagesProps) => {
  const { authUser } = useAuthContext();

  const fromMe =  sender_id === authUser.id 

  const formattedTime = extractTime(sent_at);

  const chatClassName = fromMe ? "items-end" : "items-start";
//   const layout = formMe ? ""
  const bubbleBgColor = fromMe ? "bg-teal-500" : "bg-white";
  const bubbleTextColor = fromMe ? "text-white" : "text-gray-900";
  const timeTextColor = fromMe ? "text-teal-100" : "text-gray-500";

  return (
  <div className={`chat flex flex-col ${chatClassName}`}>
    <div className={`${bubbleBgColor} py-2 px-4 rounded-lg`}>
    <div className={`chat-bubble  ${bubbleTextColor} pb-1`}>
      {content}
    </div>

    <div className={`opacity-50 text-xs flex ${timeTextColor} gap-1 items-center`}>
      {formattedTime}
    </div>
    </div>
  </div>
);
}
export default Message;

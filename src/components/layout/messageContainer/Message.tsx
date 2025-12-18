import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { extractTime } from "../../../utils/extractTime";
import { FaCheck, FaCheckDouble } from "react-icons/fa"; // react-icons for status

interface MessagesProps {
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
  __v,
}: MessagesProps) => {
  const { authUser } = useAuthContext();

  const fromMe = sender_id === authUser.id;
  const formattedTime = extractTime(sent_at);

  const chatClassName = fromMe ? "items-end" : "items-start";
  const bubbleBgColor = fromMe ? "bg-teal-500" : "bg-white";
  const bubbleTextColor = fromMe ? "text-white" : "text-gray-900";
  const timeTextColor = fromMe ? "text-teal-100" : "text-gray-500";

  // ✅ Determine message status
  let statusIcon;
  let statusColor = "text-gray-400";

  if (fromMe) {
    if (read_at) {
      statusIcon = <FaCheckDouble />; // blue double
      statusColor = "text-blue-700";
    } else if (delivered_at) {
      statusIcon = <FaCheckDouble />; // gray double
      statusColor = "text-white";
    } else {
      statusIcon = <FaCheck />; // gray single
      statusColor = "text-white";
    }
  }

  return (
    <div className={`chat flex flex-col ${chatClassName} mb-2`}>
      <div className={`${bubbleBgColor} py-2 px-4 rounded-lg max-w-xs`}>
        <div className={`chat-bubble ${bubbleTextColor} pb-1`}>
          {content}
        </div>

        <div className={`opacity-50 text-xs flex ${timeTextColor} gap-1 items-center justify-end`}>
          <span>{formattedTime}</span>
          {fromMe && (
            <span className={`flex items-center ${statusColor}`}>
              {statusIcon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

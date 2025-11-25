import React from "react";
import { useAuthContext } from "../../../context/authContext";
import { extractTime } from "../../../utils/extractTime";

interface MessagesProps {
  id: number;
  senderId: number;
  receiverId: number;
  seenBy: string[];
  message: string;
  createdAt: string;
  updatedAt: string;
}

const Message = ({
  senderId,
  message,
  createdAt,
}: MessagesProps) => {
  const { authUser } = useAuthContext();

  const fromMe =  senderId === authUser.id 

  const formattedTime = extractTime(createdAt);

  const chatClassName = fromMe ? "items-end" : "items-start";
//   const layout = formMe ? ""
  const bubbleBgColor = fromMe ? "bg-teal-500" : "bg-white";
  const bubbleTextColor = fromMe ? "text-white" : "text-gray-900";
  const timeTextColor = fromMe ? "text-teal-100" : "text-gray-500";

  return (
  <div className={`chat flex flex-col ${chatClassName}`}>
    <div className={`${bubbleBgColor} py-2 px-4 rounded-lg`}>
    <div className={`chat-bubble  ${bubbleTextColor} pb-1`}>
      {message}
    </div>

    <div className={`opacity-50 text-xs flex ${timeTextColor} gap-1 items-center`}>
      {formattedTime}
    </div>
    </div>
  </div>
);
}
export default Message;

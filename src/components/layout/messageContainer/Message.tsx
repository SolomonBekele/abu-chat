import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
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
  id,
  senderId,
  receiverId,
  seenBy,
  message,
  createdAt,
  updatedAt
}: MessagesProps) => {
    const {authUser}=useAuthContext();
    const fromMe = senderId === authUser._id;
    const formatedTime = extractTime(createdAt)
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    // const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? 'bg-teal-500' : "bg-white"
    const bubbleTextColor = fromMe ? 'text-white' : "text-gray-900"
    const timeTextColor = fromMe ? 'text-teal-200': 'text-gray-500'
    // const shakeClass = message.shouldShake ? "shake" : " "

  return (
  <div className={`chat ${chatClassName} `}>
        <div className='chat-image avatar'>
                </div>
                <div className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} pb-2`}>{message}</div>
			<div className={`chat-footer opacity-50 text-xs flex ${timeTextColor} gap-1 items-center`}>{formatedTime}</div>
    
    </div>)
};

export default Message;

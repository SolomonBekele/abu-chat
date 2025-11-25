import React, { useState } from "react";

interface MessageInputProps {
  onSend?: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend?.(message);
    setMessage("");
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 absolute bottom-0 w-full">
      <div className="space-y-2">
        <div className="flex items-center gap-1 md:gap-2">
          {/* Left buttons */}
          <div className="hidden sm:flex gap-1">
            <button className="size-9 rounded-md text-gray-500 hover:text-gray-700 flex items-center justify-center">
              {/* Smile Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>

            <button className="size-9 rounded-md text-gray-500 hover:text-gray-700 flex items-center justify-center">
              {/* Paperclip Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
              </svg>
            </button>
          </div>

          {/* TEXTAREA */}
          <div className="flex-1 relative">
            <textarea
              className="w-full min-h-[44px] max-h-[120px] resize-none rounded-md border px-3 py-2 text-base md:text-sm pr-20 md:pr-24 outline-none"
              placeholder="Type a message..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Mic + Video buttons */}
            <div className="absolute right-3 bottom-3 flex gap-1">
              <button className="w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 flex items-center justify-center">
                {/* Mic Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6" // ← FULL SIZE
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 19v3" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <rect x="9" y="2" width="6" height="13" rx="3" />
                </svg>
              </button>

              <button className="w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 flex items-center justify-center">
                {/* Video Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6" // ← FULL SIZE
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* SEND BUTTON */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="size-9 rounded-md flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            {/* Send Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6" // ← FULL SIZE
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

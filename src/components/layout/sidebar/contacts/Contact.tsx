import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { fetchMessages } from "../../../../store/Messages/messageThunk";
import { setSelectedConversation } from "../../../../store/Conversations/conversationSlice";

interface ContactProps {
  id: number;
  name: string;
  profile_picture: string;
  last_seen: string;
  timeAgo: string;
  unreadCount: number;
  isActive: boolean; // <-- NEW
}

export const Contact = ({
  id,
  name,
  profile_picture,
  last_seen,
  timeAgo,
  unreadCount,
  isActive,
}: ContactProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddMessages = (userId: number) => {
    const contact = {
      id,
      name,
      profile_picture,
      last_seen,
      timeAgo,
      unreadCount,
    };

    dispatch(fetchMessages(userId));
    dispatch(setSelectedConversation(contact));
  };

  return (
    <button
      onClick={() => handleAddMessages(id)}
      className={`w-full p-3 rounded-lg text-left flex items-start gap-3 transition-colors 
        ${isActive ? "bg-teal-50" : "hover:bg-gray-50"}`}
    >
      <div className="flex gap-3 ">
      <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
        <img
          className="aspect-square size-full"
          alt={name}
          src={profile_picture}
        />
      </span>
       
        <div className=" mb-1">
          <p className="text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-500">Last Seen at <span className="ml-1">{last_seen}</span></p>
        </div>
        </div>
    </button>
  );
};

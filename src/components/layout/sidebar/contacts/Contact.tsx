import { useFetchConversation } from "../../../../hooks/useFetchConversation";
interface ContactProps { id: string; // 🔴 should be string (UUID) 
name: string; 
profile_picture: string; 
last_seen: string; 
timeAgo: string; 
unreadCount: number; 
isActive: boolean; }

export const Contact = ({
  id,
  name,
  profile_picture,
  last_seen,
  isActive,
}: ContactProps) => {

  const { fetchConversationByUserId } = useFetchConversation();

  return (
    <button
      onClick={() => fetchConversationByUserId(id)}
      className={`w-full p-3 rounded-lg text-left flex items-start gap-3 transition-colors 
        ${isActive ? "bg-teal-50" : "hover:bg-gray-50"}`}
    >
      <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full">
        <img className="aspect-square size-full" alt={name} src={profile_picture} />
      </span>

      <div>
        <p className="text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500">
          Last seen at <span className="ml-1">{last_seen}</span>
        </p>
      </div>
    </button>
  );
};

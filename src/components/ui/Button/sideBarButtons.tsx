import { useNavigate } from "react-router-dom";
import { ChatIcon, CollapseIcon, ContactIcon, ExpandIcon, LogoutIcon, SettingIcon } from "../icons/menuBarIcons";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Profile/userSlice";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetConversation } from "../../../store/Conversations/conversationSlice";
import { resetContact } from "../../../store/Contacts/contactSlice";
import { resetMessages } from "../../../store/Messages/messageSlice";
type CollapseButtonProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
type ButtonProps = {
  collapsed?: boolean;
  active?: boolean;
  onClick?: () => void;
};
type CollapseProps = {
  collapsed: boolean;
};


export const CollapseButton = ({ collapsed, setCollapsed }:CollapseButtonProps) => {
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="inline-flex items-center justify-center size-9 rounded-md hover:bg-gray-100"
    >
      {collapsed ? <ExpandIcon /> : <CollapseIcon />}
    </button>
  );
};

export const ChatButton: React.FC<ButtonProps> = ({ collapsed, active, onClick }) => {
  return (
    <button onClick={onClick} className ={`flex items-center gap-3 h-10 px-4 w-full hover:bg-gray-100 rounded-md transition-all
    ${active && "bg-slate-200"}
    `}>
      <ChatIcon />
      {!collapsed && <span>Chats</span>}
    </button>
  );
};
export const ContactButton: React.FC<ButtonProps> = ({ collapsed, active, onClick }) => {
  return (
    <button onClick={onClick} className ={`flex items-center gap-3 h-10 px-4 w-full hover:bg-gray-100 rounded-md transition-all
    ${active && "bg-slate-200"}
    `}>
      <ContactIcon />
      {!collapsed && <span>Contacts</span>}
    </button>
  );
};

export const SettingButton: React.FC<ButtonProps> = ({ collapsed, active, onClick }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 h-10 px-4 w-full hover:bg-gray-100 rounded-md transition-all
    ${active && "bg-slate-200"}
    `}>
      <SettingIcon />
      {!collapsed && <span>Settings</span>}
    </button>
  );
};
export const LogoutButton = ({ collapsed }:CollapseProps) => {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { setAuthUser } = useAuthContext();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    dispatch(resetConversation());
    dispatch(resetContact());
    dispatch(resetMessages())
    setAuthUser(null)
    toast.success("logged out successfully");
  };
  return (
    <button className="flex items-center gap-3 h-10 px-4 w-full hover:bg-red-50 text-red-600 rounded-md transition-all"
    onClick={handleLogout}>
      <LogoutIcon />
      {!collapsed && <span>Logout</span>}
    </button>
  );
};

import React from "react";
import Conversations from "./conversations/Conversations";
import Setting from "./settings/Setting";
import Contacts from "./contacts/Contacts";


type ChatSettingProps = {
  activeTab: "conversations" | "settings" | "contacts";
};

const SideBar: React.FC<ChatSettingProps> = ({ activeTab }) => {
  return (
    <div className="w-80 shrink-0">
      <div className="h-full flex flex-col border-r md:border-r border-gray-200 bg-white">
        {activeTab === "conversations" && <Conversations />}
        {activeTab === "settings" && <Setting />}
        {activeTab === "contacts" && <Contacts />}
      </div>
    </div>
  );
};

export default SideBar;

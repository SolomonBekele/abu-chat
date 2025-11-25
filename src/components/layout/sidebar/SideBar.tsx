import React from "react";
import Conversations from "./Conversations";
import Setting from "../menubar/Setting";


type ChatSettingProps = {
  activeTab: "chat" | "settings";
};

const SideBar: React.FC<ChatSettingProps> = ({ activeTab }) => {
  return (
    <div className="w-80 shrink-0">
      <div className="h-full flex flex-col border-r md:border-r border-gray-200 bg-white">
        {activeTab === "chat" && <Conversations />}
        {activeTab === "settings" && <Setting />}
      </div>
    </div>
  );
};

export default SideBar;

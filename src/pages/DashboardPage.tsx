import React, { useState } from "react";
import MenuBar from "../components/layout/menubar/MenuBar";
import MessageContainer from "../components/layout/messageContainer/MessageContainer";
import SideBar from "../components/layout/sidebar/SideBar";
import { useAuthContext } from "../context/AuthContext";

const DashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "settings">("chat");
  return (
    <div className="h-screen flex overflow-hidden">
      <MenuBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SideBar activeTab={activeTab} />
      <MessageContainer />
    </div>
  );
};

export default DashboardPage;

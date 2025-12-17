import React from "react";
import {
  ChatButton,
  CollapseButton,
  ContactButton,
  LogoutButton,
  SettingButton,
} from "../../ui/Button/sideBarButtons";

type MenuBarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: "conversations" | "settings" | "contacts";
  setActiveTab: React.Dispatch<React.SetStateAction<"conversations" | "settings" | "contacts">>;
};

const MenuBar: React.FC<MenuBarProps> = ({
  collapsed,
  setCollapsed,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className={`h-full bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 
      ${collapsed ? "w-20" : "w-100"}`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h2 className="text-gray-800">ChatApp</h2>}
        <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <hr className="border-gray-200" />

      {/* Main Buttons */}
      <div className="flex-1 p-2 flex flex-col gap-2">
        <ChatButton
          collapsed={collapsed}
          active={activeTab === "conversations"}
          onClick={() => setActiveTab("conversations")}
        />
        <ContactButton
          collapsed={collapsed}
          active={activeTab === "contacts"}
          onClick={() => setActiveTab("contacts")}
        />
        <SettingButton
          collapsed={collapsed}
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </div>

      <hr className="border-gray-200" />

      {/* Logout */}
      <div className="p-2">
        <LogoutButton collapsed={collapsed} />
      </div>
    </div>
  );
};

export default MenuBar;

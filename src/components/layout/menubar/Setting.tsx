import React, { useState } from "react";
import AccountSetting from "./AccountSetting";
import PersonalizeSetting from "./PersonalizeSetting";

const Setting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"account" | "personalize">("account");

  return (
    <div className="p-4 md:p-6 w-full">
      <h2 className="mb-6">Settings</h2>

      {/* Tabs */}
      <div className="flex flex-col gap-2 w-full">
        <div className="bg-slate-200 h-9 grid grid-cols-2 rounded-xl p-[3px] text-sm md:text-base">
          {/* Account Tab */}
          <button
            onClick={() => setActiveTab("account")}
            className={`h-[calc(100%-1px)] flex items-center justify-center rounded-xl font-medium transition-all
              ${activeTab === "account" && "bg-white"}
            `}
          >
            Account
          </button>

          {/* Personalization Tab */}
          <button
            onClick={() => setActiveTab("personalize")}
            className={`h-[calc(100%-1px)] flex items-center justify-center rounded-xl font-medium transition-all
              ${activeTab === "personalize" && "bg-white"}
            `}
          >
            Personalization
          </button>
        </div>

        {/* ---------------- ACCOUNT CONTENT ---------------- */}
        {activeTab === "account" && (
          <AccountSetting/>
        )}

        {/* ---------------- PERSONALIZATION CONTENT ---------------- */}
        {activeTab === "personalize" && (
          <PersonalizeSetting/>
        )}
      </div>
    </div>
  );
};

export default Setting;

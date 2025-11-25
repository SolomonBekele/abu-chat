import React from "react";
import { CameraIcon } from "../../ui/icons/sideBarIcons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";


const AccountSetting: React.FC = () => {

  const { user} = useSelector(
    (state: RootState) => state.user
  );
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  const profilePic = user?.profilePic || localUser?.profilePic;
  const fullName = user?.fullName || localUser?.fullName;
  const email =  user?.email || localUser?.email;
  
  return (
    <div className="mt-6 space-y-6 animate-fade">
      <h3 className="mb-4">Profile Information</h3>

      {/* --- PROFILE PICTURE SECTION (UPDATED) --- */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative">
          <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full w-20 h-20">
            <img
              alt="You"
              src={profilePic}
              className="aspect-square size-full object-cover"
            />
          </span>

          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all
      disabled:pointer-events-none disabled:opacity-50
      [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
      outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]
      text-white size-9 absolute bottom-0 right-0 w-8 h-8 rounded-full
      bg-teal-500 hover:bg-teal-600"
          >
            {/* Camera Icon */}
            <CameraIcon />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            Click the camera icon to change your profile picture
          </p>
        </div>
      </div>

      {/* --- NAME --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Display Name</label>
        <input
          defaultValue={fullName}
          className="border-input h-9 w-full rounded-md border px-3 py-1"
        />
      </div>

      {/* --- STATUS --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <input
          defaultValue="Available"
          className="border-input h-9 w-full rounded-md border px-3 py-1"
        />
      </div>

      {/* --- EMAIL --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input
          disabled
          defaultValue={email}
          className="border-input h-9 w-full rounded-md border px-3 py-1 bg-gray-100"
        />
      </div>

      <button className="h-9 px-4 py-2 w-full rounded-md bg-teal-500 hover:bg-teal-600 text-white font-medium">
        Save Changes
      </button>
    </div>
  );
};

export default AccountSetting;

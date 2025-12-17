import React, { useEffect, useState } from "react";
import { CameraIcon } from "../../../ui/icons/sideBarIcons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import UpdateProfileForm from "../../../forms/UpdateProfileForm";
import { BASE_URL, USER_PROFILE_API, VERSION } from "../../../../utils/constants";
import UploadProfilePicButton from "../../../ui/Button/uploadProfilePicButton";

const AccountSetting: React.FC = () => {
  const { userData,updateProfilePic } = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState<string>(userData?.profile_picture ?? "" );
  const [imageUrl,setImageUrl] = useState<string>("")
  useEffect(() => {
  
  if (!userData?.profile_picture) return;

  const fetchProfilePic = async () => {
    try {
      const res = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}/profile/pic`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch profile pic");
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfilePic();
}, [userData?.profile_picture, updateProfilePic.isUpdated]); 


  return (
    <div className="mt-6 space-y-6 animate-fade">
      <h3 className="mb-4">Profile Information</h3>
      {/* --- PROFILE PICTURE SECTION (UPDATED) --- */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative">
          <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full w-20 h-20">
            <img
              alt={userData?.name[0]}
              src={imageUrl}
              className="aspect-square size-full object-cover"
            />
          </span>

          <UploadProfilePicButton/>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-gray-500">
            Click the camera icon to change your profile picture
          </p>
        </div>
      </div>
      <UpdateProfileForm/>
    </div>
  );
};

export default AccountSetting;

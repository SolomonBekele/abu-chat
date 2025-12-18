import React, { useRef } from "react";
import { CameraIcon } from "../icons/sideBarIcons";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic, updateUserProfile } from "../../../store/Profile/userThunk";
import { useAuthContext } from "../../../context/AuthContext";

const UploadProfilePicButton = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setAuthUser } = useAuthContext();
  const dispatch: AppDispatch = useDispatch();
  const { userData, updateProfile } = useSelector(
    (state: RootState) => state.user
  );
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userData) return;

    try {
      // Dispatch thunk to upload profile picture
    //   const resultAction = 
      await dispatch(updateProfilePic({ 
        file
      }));

    //   if (updateProfile.fulfilled.match(resultAction)) {
    //     // Update auth context if needed
    //     setAuthUser?.((prev) => prev ? { ...prev, profile_picture: resultAction.payload.imageUrl } : prev);
    //   }
    setAuthUser(userData)
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div>
    <button
    onClick={handleButtonClick}
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
    <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      </div>
  );
};

export default UploadProfilePicButton;

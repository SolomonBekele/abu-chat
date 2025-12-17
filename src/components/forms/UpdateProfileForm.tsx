import React, { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/Profile/userThunk";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";
import { resetUpdate } from "../../store/Profile/userSlice";

const UpdateProfileForm = () => {
  const { setAuthUser } = useAuthContext();
  const dispatch: AppDispatch = useDispatch();

  // 🔥 Separated slice structure:
  const { userData, updateUser } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>(userData?.email ?? "");
  const [fullName, setFullName] = useState<string>(userData?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    userData?.phone_number ?? ""
  );
  const [status, setStatus] = useState<string>(userData?.status ?? "");

  const statusOptions = ["AVAILABLE", "BUZY", "DO_NOT_DISTURB"];

  useEffect(() => {
    // console.log(update.isUpdated,update.message, userData);
    if (updateUser.isUpdated && userData) {
      toast.success(updateUser.message || "Updated successfully");
      setAuthUser(userData);
      // reset update state
    dispatch(resetUpdate());
    }
  }, [updateUser.isUpdated, userData]);

 
  useEffect(() => {
    if (updateUser.error) {
      toast.error(updateUser.error);
    }
  }, [updateUser.error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        fullName,
        phoneNumber,
        status,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* --- NAME --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          Display Name
        </label>
        <input
          id="name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border-input h-9 w-full rounded-md border px-3 py-1"
        />
      </div>

      {/* --- STATUS --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="status">
          Status
        </label>
        <select
  id="status"
  value={status} // original enum value
  onChange={(e) => setStatus(e.target.value)}
  className="border-input h-9 w-full rounded-md border px-3 py-1"
>
  {statusOptions.map((s) => {
    const formatted = s
      .toLowerCase()
      .replace(/_/g, " ");         // replace underscores with spaces
    const display = formatted.charAt(0).toUpperCase() + formatted.slice(1); // capitalize first letter only

    return (
      <option key={s} value={s}>
        {display}
      </option>
    );
  })}
</select>
      </div>

      {/* --- EMAIL --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          disabled
          type="text"
          value={email}
          className="border-input h-9 w-full rounded-md border px-3 py-1 bg-gray-100"
        />
      </div>

      {/* --- PHONE NUMBER --- */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border-input h-9 w-full rounded-md border px-3 py-1"
        />
      </div>

      {/* --- SUBMIT BUTTON --- */}
      <button
        type="submit"
        disabled={updateUser.loading}
        className="h-9 px-4 py-2 w-full rounded-md bg-teal-500 hover:bg-teal-600 text-white font-medium"
      >
        {updateUser.loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;

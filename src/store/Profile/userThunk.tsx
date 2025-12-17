import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload, LoginResponse, profilePicUpdatePayload, profilePicUpdateResponse, SignUpPayload, SignupResponse, userUpdatePayload, userUpdateResponse } from "./type";
import { BASE_URL, USER_AUTH_API, USER_PROFILE_API, VERSION } from "../../utils/constants";



export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${VERSION}${USER_AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data as LoginResponse;   // 👈 perfect match for your API
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

export const signupUser = createAsyncThunk<SignupResponse, SignUpPayload>(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${VERSION}${USER_AUTH_API}/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
         },
        
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data as SignupResponse;   // 👈 perfect match for your API
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

export const updateUserProfile = createAsyncThunk<userUpdateResponse, userUpdatePayload>(
  "user/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
         },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data as userUpdateResponse;   // 👈 perfect match for your API
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);
export const updateProfilePic = createAsyncThunk<profilePicUpdateResponse, profilePicUpdatePayload>(
  "profilePic/update",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", payload.file);
      const res = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}/profile/change-profile-pic`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
         },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data as profilePicUpdateResponse;   // 👈 perfect match for your API
    } catch (err) {
      return rejectWithValue({ message: "Network error" });
    }
  }
);

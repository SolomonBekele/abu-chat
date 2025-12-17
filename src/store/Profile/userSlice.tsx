import { createSlice } from "@reduxjs/toolkit";
import { loginUser, updateUserProfile, updateProfilePic } from "./userThunk";
import type { UserData } from "./type";

interface AsyncState {
  loading: boolean;
  error: string | null;
  message: string | null;
  isUpdated?: boolean;
  isAuthenticated?: boolean;
}

interface UserState {
  userData: UserData | null;
  login: AsyncState;
  updateUser: AsyncState;
  updateProfilePic: AsyncState;
}

const initialAsyncState: AsyncState = { loading: false, error: null, message: null };
const initialState: UserState = {
  userData: null,
  login: { ...initialAsyncState, isAuthenticated: false },
  updateUser: { ...initialAsyncState, isUpdated: false },
  updateProfilePic: { ...initialAsyncState, isUpdated: false },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.userData = null;
      state.login = { ...initialAsyncState, isAuthenticated: false };
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-refresh-token");
    },
    resetUpdate(state) {
      state.updateUser = { ...initialAsyncState, isUpdated: false };
      state.updateProfilePic = { ...initialAsyncState, isUpdated: false };
    },
  },
  extraReducers: (builder) => {
    /** ------------------- LOGIN ------------------- */
    builder
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
        state.login.message = "Logging in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.isAuthenticated = true;
        state.login.message = action.payload.message;
        localStorage.setItem("user-token", action.payload.token);
        localStorage.setItem("user-refresh-token", action.payload.refreshToken);
        state.userData = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = (action.payload as any)?.message || "Login failed";
        state.login.message = null;
      });

    /** ------------------- UPDATE USER ------------------- */
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = null;
        state.updateUser.message = "Updating...";
        state.updateUser.isUpdated = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.isUpdated = true;
        state.updateUser.message = action.payload.message;
        state.userData = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.error = (action.payload as any)?.message || "Update failed";
        state.updateUser.message = null;
      });

    /** ------------------- UPDATE PROFILE PICTURE ------------------- */
    builder
      .addCase(updateProfilePic.pending, (state) => {
        state.updateProfilePic.loading = true;
        state.updateProfilePic.error = null;
        state.updateProfilePic.isUpdated = false;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.updateProfilePic.loading = false;
        state.updateProfilePic.isUpdated = true;
        if (state.userData) {
          state.userData.profile_picture = action.payload.fileName;
        }
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.updateProfilePic.loading = false;
        state.updateProfilePic.error = (action.payload as any)?.message || "Update failed";
      });
  },
});

export const { logout, resetUpdate } = userSlice.actions;
export default userSlice.reducer;

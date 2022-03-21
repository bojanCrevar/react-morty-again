import { createSlice } from "@reduxjs/toolkit";

const profileInitalState = {
  displayName: "",
  userEmail: "",
  avatar: "",
  isDarkTheme: false,
  userType: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitalState,
  reducers: {
    setProfile(state, action) {
      state.displayName = action.payload.displayName;
      state.userEmail = action.payload.userEmail;
      state.avatar = action.payload.avatar;
      state.isDarkTheme = action.payload.isDarkTheme;
      state.userType = action.payload.userType;
    },
    removeProfile(state) {
      state.displayName = "";
      state.userEmail = "";
      state.avatar = "";
      state.isDarkTheme = false;
      state.userType = "";
    },
    toggleTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;

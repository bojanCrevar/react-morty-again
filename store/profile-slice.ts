import { createSlice } from "@reduxjs/toolkit";

const profileInitalState = {
  displayName: "",
  userEmail: "",
  avatar: "",
  isDarkTheme: false,
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
      localStorage.setItem("isDarkTheme", action.payload.isDarkTheme);
    },
    removeProfile(state) {
      state.displayName = "";
      state.userEmail = "";
      state.avatar = "";
      state.isDarkTheme = false;
    },
    toggleTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;

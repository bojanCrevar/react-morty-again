import { createSlice } from "@reduxjs/toolkit";

const profileInitalState = {
  displayName: "",
  email: "",
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
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.isDarkTheme = action.payload.isDarkTheme;
      state.userType = action.payload.userType;
      localStorage.setItem("isDarkTheme", action.payload.isDarkTheme);
    },
    removeProfile(state) {
      state.displayName = "";
      state.email = "";
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

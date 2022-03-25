import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: () => authInitialState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logOut(state) {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isDarkTheme");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

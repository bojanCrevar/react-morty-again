import { createSlice } from "@reduxjs/toolkit";

const authInitalState = {
  token: "",
  username: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    logOut(state) {
      state.token = "";
      state.username = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

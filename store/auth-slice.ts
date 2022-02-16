import { createSlice } from "@reduxjs/toolkit";

const authInitalState = {
  isAuthenticated: false,
  userName: "",
  changed: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    login(state, action) {
      state.userName = action.payload;
      state.changed = "login";
    },
    logout(state, action) {
      state.userName = action.payload;
      state.changed = "logout";
    },
    replaceLogin(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
      state.changed = action.payload.changed;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

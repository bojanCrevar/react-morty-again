import { createSlice } from "@reduxjs/toolkit";

const authInitalState = {
  isAuthenticated: false,
  userName: "",
  password: "",
  changed: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    login(state, action) {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.changed = "login";
    },
    logout(state) {
      state.changed = "logout";
    },
    replaceLogin(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.changed = action.payload.changed;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

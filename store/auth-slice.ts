import { createSlice } from "@reduxjs/toolkit";

const authInitalState = {
  isAuthenticated: false,
  userName: "",
  password: "",
  changed: "",
  warningMessage: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    login(state, action) {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.changed = "login";
      state.warningMessage = "";
    },
    logout(state) {
      state.changed = "logout";
      state.warningMessage = "";
    },
    replaceLogin(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.changed = action.payload.changed;
      state.warningMessage = "";
    },
    warningUserLogin(state, action) {
      state.warningMessage = action.payload.warningMessage;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

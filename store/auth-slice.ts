import { createSlice } from "@reduxjs/toolkit";

const authInitalState = {
  isAuthenticated: false,
  userName: "",
  password: "",
  warningMessage: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    replaceLogin(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.warningMessage = "";
    },
    warningUserLogin(state, action) {
      state.warningMessage = action.payload.warningMessage;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

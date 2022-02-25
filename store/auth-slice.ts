import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
  isLoggedIn: false,
  localId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.localId = action.payload.localId;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
    },
    logOut(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.localId = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    },
    replaceToken(state, action) {
      state.localId = action.payload.newLocalId;
      localStorage.setItem("token", action.payload.newLocalId);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

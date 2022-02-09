import { createSlice } from "@reduxjs/toolkit";

const authInitalState = { isAuthenticated: false, userName: "" };

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitalState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userName = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false, username: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;

export const authActions = authSlice.actions;

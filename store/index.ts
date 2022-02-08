import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, userName: "" };

const loginSlice = createSlice({
  name: "authentication",
  initialState,
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

const store = configureStore({
  reducer: { auth: loginSlice.reducer },
});

export const loginActions = loginSlice.actions;

export default store;

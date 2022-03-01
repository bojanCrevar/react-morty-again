import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import filterKeywordSlice from "./filter-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filter: filterKeywordSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;

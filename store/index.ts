import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import filterKeywordSlice from "./filter-slice";
import profileSlice from "./profile-slice";
import notificationSlice from "./notification-slice";
import paginationSlice from "./pagination-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filter: filterKeywordSlice.reducer,
    profile: profileSlice.reducer,
    notification: notificationSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});

export default store;

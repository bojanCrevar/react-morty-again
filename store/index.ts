import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import filterKeywordSlice from "./filter-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, filter: filterKeywordSlice.reducer },
});

export default store;
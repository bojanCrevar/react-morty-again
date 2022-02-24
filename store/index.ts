import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import filterKeywordSlice from "./filter-slice";
import themeSlice from "./theme-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filter: filterKeywordSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;

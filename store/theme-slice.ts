import { createSlice } from "@reduxjs/toolkit";

const themeInitialState = { theme: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    toggleDarkTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;

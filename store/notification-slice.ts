import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  header: "",
  body: "",
  isShown: false,
  bgColor: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotification(state, action) {
      state.header = action.payload.header;
      state.body = action.payload.body;
      state.isShown = action.payload.isShown;
      state.bgColor = action.payload.bgColor;
    },
    hideNotification(state) {
      state.isShown = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;

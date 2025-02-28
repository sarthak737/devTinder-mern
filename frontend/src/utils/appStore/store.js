import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlide.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

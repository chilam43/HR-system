import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";

export let store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {
  getLocalStorage,
  clearLocalStorage,
  JWTPayload,
} from "../localStorage";

export interface UserState {
  user: {
    id: number;
    email: string;
    name: string;
    access_level_id: number;
  } | null;
}

const initialState: UserState = {
  user: getLocalStorage(),
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state) {
      // localStorage.setItem("token", payload.payload.token);
      state.user = getLocalStorage();
    },
    loginOut(state) {
      clearLocalStorage();
      state.user = null
    },
  },
});

export const { login, loginOut } = loginSlice.actions;

export default loginSlice.reducer;

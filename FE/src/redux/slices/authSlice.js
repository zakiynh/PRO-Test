import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    role: Cookies.get("role") || null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      Cookies.set("token", action.payload.token, { expires: 7 });
      Cookies.set("role", action.payload.role, { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;

      Cookies.remove("token");
      Cookies.remove("role");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

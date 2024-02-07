// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Function to retrieve user from local storage
const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : null;
};

// Check if user exists in local storage
const user = getUserFromLocalStorage();

const initialState = {
  isAuthenticated: Boolean(user), // Set isAuthenticated based on whether user exists
  user: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Remove user from local storage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false,
  },
  reducers: {
    setIsLoggedin: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.isAdmin = action.payload.isAdmin;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAdmin", action.payload.isAdmin);
      } else {
        state.isLoggedIn = false;
        state.isAdmin = false;
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
      }
      return state;
    },
    updateName: (state, action) => {
      state.name = action.payload;
      return state;
    },
  },
});

export const { setIsLoggedin, updateName } = slice.actions;
export default slice.reducer;

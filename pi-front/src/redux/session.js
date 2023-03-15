import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    name: "unknown",
  },
  reducers: {
    setIsLoggedin: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload);
      } else {
        state.isLoggedIn = false;
        localStorage.removeItem("token");
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

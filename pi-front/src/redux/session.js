import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: false,
    name: "unknown",
  },
  reducers: {
    setIsLoggedin: (state, action) => {
      state.isLoggedIn = action.payload;
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

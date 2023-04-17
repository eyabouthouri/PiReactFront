import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "theme",
  initialState: {
    isDarkTheme: localStorage.getItem("isDarkTheme") === "true" ? true : false,
    users: [],
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.isDarkTheme = action.payload;
      localStorage.setItem("isDarkTheme", action.payload);
      return state;
    },
    setUsers: (state, action) => {
      /*action.payload = {
        users: ["Sami", "Dorsaf", "Wassim"],
        addIndex: [1]
      }*/
      const { users, addIndex } = action.payload;
      // const users = action.payload.users;
      // const addIndex = action.payload.addIndex;
      state.users = action.payload.users;
      return state;
    },
  },
});

export const { setDarkMode, setUsers } = slice.actions;
export default slice.reducer;

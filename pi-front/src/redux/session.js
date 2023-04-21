import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false,
    isUser: localStorage.getItem("isUser") === "true" ? true : false,
    isCoach: localStorage.getItem("isCoach") === "true" ? true : false,

    userexisting : localStorage.getItem("userexisting") 
  },
  reducers: {
    setIsLoggedin: (state, action) => {
     
      if (action.payload) {
        state.isLoggedIn = true;
        state.isAdmin = action.payload.isAdmin;
        state.isUser = action.payload.isUser;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAdmin", action.payload.isAdmin);
        localStorage.setItem("isUser",action.payload.isUser);
        localStorage.setItem("isCoach",action.payload.isCoach);
        localStorage.setItem("userexisting",JSON.stringify(action.payload.userexisting));
        console.log(action.payload.userexisting)
        
      } else {
        state.isLoggedIn = false;
        state.isAdmin = false;
        state.isUser = false;
        state.isCoach = false;
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isUser");
        localStorage.removeItem("isCoach");
        localStorage.removeItem("userexisting")
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

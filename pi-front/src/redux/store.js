import session from "./session.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { session },
});

export default store;

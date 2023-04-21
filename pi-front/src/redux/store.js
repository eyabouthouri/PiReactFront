import theme from "./theme.js";
import session from "./session.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { session, theme },
  // middleware: [logger]
});

export default store;

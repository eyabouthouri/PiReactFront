import axios from "axios";
axios.defaults.headers.common["Content-Type"] = "application/json";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
  } else {
    axios.defaults.baseURL = "https://youthc.onrender.com";
  }
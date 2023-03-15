import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import About from "../components/About";
import axios from "axios";
function Home(props) {
  const [user, setUser] = useState([]);

  const refreshtoken = async () => {
    const res = await axios
      .get("http://localhost:5000/users/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    {
      let interval = setInterval(() => {
        refreshtoken();
      }, 1000 * 29);
    }
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;

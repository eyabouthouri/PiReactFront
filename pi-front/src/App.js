import React, { Component, useState } from "react";
import "./helpers/axiosConfig";
import Library from "./Library/views/Library";
import Home from "./Home/Home";
import Event from "./event/views/Event";
import Course from "./course/views/Course";
import NavbarModule from "./components/NavbarModule";
import SignIn from "./Home/SignIn";
import SignUp from "./Home/SignUp";
import AddLibrary from "./Library/views/AddLibrary";
import AddEvent from "./event/views/AddEvent";
import AddCoach from "./coach/views/AddCoach";
import AddCourse from "./course/views/AddCourse";
import ShowLiabrary from "./Library/views/ShowLiabrary";
import ShowCoach from "./coach/views/ShowCoach";
import ShowCourse from "./course/views/ShowCourse";
import ShowEvent from "./event/views/ShowEvent";
import { Link, Route, Routes } from "react-router-dom";
import UpdateUser from "./coach/views/updateuser";
import ForgotPassword from "./coach/views/ForgotPassword";
import ResetPassword from "./coach/views/ResetPassword";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useSelector } from "react-redux";
import store from "./redux/store";
import { Provider } from "react-redux";
import Homebeforsignin from "./Home/homebeforesignin";
import PrivateRoute from "./components/PrivateRoute";
import NotLoggedRoute from "./components/NotLoggedRoute";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <ReactNotifications />
      <Routes>
      <Route path="/ShowCoach" element={<PrivateRoute><ShowCoach></ShowCoach></PrivateRoute>}></Route>
        <Route path="/UpdateUser" element={<PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>} />
        <Route path="/AddCoach" element={<PrivateRoute><AddCoach></AddCoach></PrivateRoute>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/resetpassword/:token" element={<ResetPassword></ResetPassword>} />
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/event" element={<Event></Event>}></Route>
        <Route path="/addevent" element={<AddEvent />}></Route>
        <Route path="/Signin" element={<NotLoggedRoute><SignIn></SignIn></NotLoggedRoute>}></Route>
        <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
        <Route path="/AddLibrary" element={<AddLibrary></AddLibrary>}></Route>
        <Route path="/AddCourse" element={<AddCourse></AddCourse>}></Route>
        <Route path="/ShowLiabrary" element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path="/ShowCourse" element={<ShowCourse></ShowCourse>}></Route>
        <Route path="/ShowLiabrary" element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path="/ShowEvent" element={<ShowEvent></ShowEvent>}></Route>
        <Route path="/" element={<Homebeforsignin></Homebeforsignin>}></Route>
      </Routes>
    </div>
  );
}

export default App;

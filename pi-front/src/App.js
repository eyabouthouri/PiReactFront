import React, { Component, useState } from "react";
import "./App.css";
import "./helpers/axiosConfig";
import Library from "./Library/views/Library";
import Home from "./Home/Home";
import Event from "./event/views/Event";
import AllEvents from "./event/views/AllEvents";
import EventDetails from "./event/views/EventDetails";
import Course from "./course/views/Course";
import NavbarModule from "./components/NavbarModule";
import SignIn from "./Home/SignIn";
import SignUp from "./Home/SignUp";
import AddLibrary from "./Library/views/AddLibrary";
import AddEvent from "./event/views/AddEvent";
import NewsLetter from "./event/views/NewsLetter";
import Takss from "./event/views/Takss";

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
import ShowAttendees from "./event/views/ShowAttendees";
import Updateev from "./event/views/Updateev";
import Map from "./event/views/Map";
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <ReactNotifications />
      <Routes>
      <Route path="/ShowCoach" element={<PrivateRoute isAdmin={true}><ShowCoach></ShowCoach></PrivateRoute>}></Route>
        <Route path="/UpdateUser" element={<PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>} />
        <Route path="/AddCoach" element={<PrivateRoute><AddCoach></AddCoach></PrivateRoute>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/resetpassword/:token" element={<ResetPassword></ResetPassword>} />
        <Route path="/home" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
        <Route path="/event" element={<Event></Event>}></Route>
        <Route path="/allevent" element={<AllEvents></AllEvents>}></Route>
        <Route path="/map" element={<Map></Map>}></Route>


        <Route path="/eventdetails/:idevent" element={<EventDetails></EventDetails>}></Route>
        <Route path="/ShowAttendees" element={<ShowAttendees></ShowAttendees>}></Route>
        <Route path="/NewsLetter" element={<NewsLetter></NewsLetter>}></Route>
        <Route path="/takss" element={<Takss></Takss>}></Route>

       

        
        


        <Route path="/Updateev/:id" element={<PrivateRoute><Updateev></Updateev></PrivateRoute>} />

        
        <Route path="/addevent" element={<AddEvent />}></Route>
        <Route path="/Signin" element={<NotLoggedRoute><SignIn></SignIn></NotLoggedRoute>}></Route>
        <Route path="/SignUp" element={<NotLoggedRoute><SignUp></SignUp></NotLoggedRoute>}></Route>
        <Route path="/AddLibrary" element={<AddLibrary></AddLibrary>}></Route>
        <Route path="/AddCourse" element={<AddCourse></AddCourse>}></Route>
        <Route path="/ShowLiabrary" element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path="/ShowCourse" element={<ShowCourse></ShowCourse>}></Route>
        <Route path="/ShowLiabrary" element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path="/ShowEvent" element={<ShowEvent></ShowEvent>}></Route>
        <Route path="/" element={<NotLoggedRoute><Homebeforsignin></Homebeforsignin></NotLoggedRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;

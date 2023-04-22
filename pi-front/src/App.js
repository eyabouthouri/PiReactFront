import React, { Component, useState } from "react";
import "./App.css";
import "./helpers/axiosConfig";
import Home from "./Home/Home";
import Event from "./event/views/Event";
import AllEvents from "./event/views/AllEvents";
import EventDetails from "./event/views/EventDetails";
import NavbarModule from "./components/NavbarModule";
import SignIn from "./Home/SignIn";
import SignUp from "./Home/SignUp";
import AddEvent from "./event/views/AddEvent";
import NewsLetter from "./event/views/NewsLetter";
import Takss from "./event/views/Takss";

import AddCoach from "./coach/views/AddCoach";
import AddCourse from "./course/views/AddCourse";
import AddLesson from "./course/views/AddLesson";
import ClientCourse from "./course/views/ClientCourse";
import ClientLesson from "./course/views/ClientLesson";
import ShowCoach from "./coach/views/ShowCoach";
import ShowCourse from "./course/views/ShowCourse";
import ShowLessons from "./course/views/ShowLessons";
import ShowEvent from "./event/views/ShowEvent";
import { Route, Routes, useParams } from "react-router-dom";
import UpdateUser from "./coach/views/updateuser";
import ForgotPassword from "./coach/views/ForgotPassword";
import ResetPassword from "./coach/views/ResetPassword";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Homebeforsignin from "./Home/homebeforesignin";
import PrivateRoute from "./components/PrivateRoute";
import NotLoggedRoute from "./components/NotLoggedRoute";
import ShowAttendees from "./event/views/ShowAttendees";
import Updateev from "./event/views/Updateev";
import Map from "./event/views/Map";

import GetallCoach from "./MentalHealth/getallcoach";
import AjouterCoach from "./MentalHealth/coach";
import GetRdv from "./MentalHealth/getrendezvous";
import GetrdvPatient from "./MentalHealth/getrdvpatient";
import Messenger from "./chat/messenger";
import AddLibrary from "./Library/views/AddLibrary";
import ShowLiabrary from "./Library/views/ShowLiabrary";
import Rem from "./Home/Rem";
import AffCmntr from "./Library/views/AffCmntr";
import ShowCmntr from "./Library/views/ShowCmntr";
import Addabonnement from "./Library/views/Addabonnement";
import ShowAbo from "./Library/views/ShowAbo";
import UpdateAbb from "./Library/views/UpdateAbb";
import Details from "./Library/views/Details";
import Aff from "./Library/views/Aff";
import Cm from "./Library/views/Cm";
import UpdateLibrary from "./Library/views/UpdateLibrary";
import AbonnementStat from "./Library/views/AbonnementStat";
import Dashboard from "./Library/views/Dashboard";
import Pdf from "./Library/views/Pdf";
import Library from "./Library/views/Library";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  let { id } = useParams();

  return (
    <div>
      <ReactNotifications />
      <Routes>
        <Route
          path="/ShowCoach"
          element={
            <PrivateRoute isAdmin={true}>
              <ShowCoach></ShowCoach>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/UpdateUser"
          element={
            <PrivateRoute>
              <UpdateUser></UpdateUser>
            </PrivateRoute>
          }
        />
        <Route
          path="/AddCoach"
          element={
            <PrivateRoute>
              <AddCoach></AddCoach>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/resetpassword/:token" element={<ResetPassword></ResetPassword>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home></Home>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/event" element={<Event></Event>}></Route>
        <Route path="/allevent" element={<AllEvents></AllEvents>}></Route>
        <Route path="/map" element={<Map></Map>}></Route>


        <Route path="/eventdetails/:idevent" element={<EventDetails></EventDetails>}></Route>
        <Route path="/ShowAttendees" element={<ShowAttendees></ShowAttendees>}></Route>
        <Route path="/NewsLetter" element={<NewsLetter></NewsLetter>}></Route>
        <Route path="/takss" element={<Takss></Takss>}></Route>

       

        
        


        <Route path="/Updateev/:id" element={<PrivateRoute><Updateev></Updateev></PrivateRoute>} />

        
        <Route path="/addevent" element={<AddEvent />}></Route>
        <Route
          path="/Signin"
          element={
            <NotLoggedRoute>
              <SignIn></SignIn>
            </NotLoggedRoute>
          }
        ></Route>
        <Route
          path="/SignUp"
          element={
            <NotLoggedRoute>
              <SignUp></SignUp>
            </NotLoggedRoute>
          }
        ></Route>
        <Route
          path="/AddLibrary"
          element={
            <PrivateRoute isAdmin={true}>
              <AddLibrary></AddLibrary>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/ShowCmntr"
          element={
            <PrivateRoute isAdmin={true}>
              <ShowCmntr></ShowCmntr>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/library" element={<Library></Library>}></Route>
        <Route
          path="/updateL/:id"
          element={
            <PrivateRoute isAdmin={true}>
              <UpdateLibrary />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/det/:Libraryid" element={<Details></Details>}></Route>
        <Route path="/Aff/:Libraryid" element={<Aff></Aff>}></Route>
        <Route
          path="/ShowLiabrary"
          element={
            <PrivateRoute isAdmin={true}>
              <ShowLiabrary></ShowLiabrary>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/rem" element={<Rem></Rem>}></Route>
        <Route path="/Affc" element={<AffCmntr></AffCmntr>}></Route>
        <Route path="/adda/:Libraryid" element={<Addabonnement></Addabonnement>}></Route>
        <Route
          path="/showabb"
          element={
            <PrivateRoute isAdmin={true}>
              <ShowAbo></ShowAbo>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/updatea/:id"
          element={
            <PrivateRoute isAdmin={true}>
              <UpdateAbb></UpdateAbb>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/cm" element={<Cm></Cm>}></Route>
        <Route
          path="/stat/:Libraryid"
          element={
            <PrivateRoute isAdmin={true}>
              <AbonnementStat></AbonnementStat>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashbord"
          element={
            <PrivateRoute isAdmin={true}>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/pdf" element={<Pdf></Pdf>}></Route>

        <Route path="/ShowEvent" element={<ShowEvent></ShowEvent>}></Route>

        <Route path="/" element={<NotLoggedRoute><Homebeforsignin></Homebeforsignin></NotLoggedRoute>}></Route>
        <Route path="/getallcoach" element={<GetallCoach></GetallCoach>}></Route>
        <Route path="/ajoutercoach" element={<AjouterCoach></AjouterCoach>}></Route>
        <Route path="/getrdv" element={<GetRdv></GetRdv>}></Route>
        <Route  path="/getrdvpatient" element={<GetrdvPatient></GetrdvPatient>}></Route>
        <Route  path="/chat" element={<Messenger></Messenger>}></Route>
    

        <Route
          path="/"
          element={
            <NotLoggedRoute>
              <Homebeforsignin></Homebeforsignin>
            </NotLoggedRoute>
          }
        ></Route>
        <Route
          path="/AddCourse"
          element={
            <PrivateRoute isAdmin={true}>
              <AddCourse></AddCourse>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/ShowCourse"
          element={
            <PrivateRoute isAdmin={true}>
              <ShowCourse></ShowCourse>
            </PrivateRoute>
          }
        ></Route>
        <Route path="/Course" element={<ClientCourse />}></Route>
        <Route
          path="/updateCourse/:id"
          element={
            <PrivateRoute isAdmin={true}>
              <AddCourse />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/clientLesson/:courseId"
          element={
            <PrivateRoute>
              <ClientLesson />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/AddLesson/:courseId"
          element={
            <PrivateRoute isAdmin={true}>
              <AddLesson></AddLesson>
            </PrivateRoute>
          }
        />
        <Route
          path="/updateLesson/:id"
          element={
            <PrivateRoute isAdmin={true}>
              <AddLesson />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/ShowCourseLessons/:courseId" element={<ShowLessons></ShowLessons>}></Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

import React, { Component } from 'react';

import Library from './Library/views/Library';
import Home  from './Home/Home';
import Event from './event/views/Event';
import Course from './course/views/Course';
import NavbarModule from './components/NavbarModule';
import SignIn from './Home/SignIn';
import SignUp from './Home/SignUp';
import AddLibrary from './Library/views/AddLibrary';
import AddEvent from './event/views/AddEvent';
import AddCoach from './coach/views/AddCoach';
import AddCourse from './course/views/AddCourse';
import ShowLiabrary from './Library/views/ShowLiabrary';
import ShowCoach from './coach/views/ShowCoach';
import ShowCourse from './course/views/ShowCourse';
import ShowEvent from './event/views/ShowEvent';
import { Route,Routes ,useParams } from 'react-router-dom';
import UpdateUser from './coach/views/updateuser';
import { useSelector } from "react-redux";

import Terms from './Home/Terms';
import Rem from './Home/Rem';
import AffCmntr from './Library/views/AffCmntr';
import ShowCmntr from './Library/views/ShowCmntr';
import FormInputComment from './Library/views/FormInputComment';
import Addabonnement from './Library/views/Addabonnement';
import ShowAbo from './Library/views/ShowAbo';
import UpdateAbb from './Library/views/UpdateAbb';
import DetailAddCmntr from './Library/views/DetailAddCmntr';
import Details from './Library/views/Details';
import Aff from './Library/views/Aff';
import SearchBar from './Library/views/SearchBar';
import Cm from './Library/views/Cm';
import PrivateRoute from './components/PrivateRoute';
import UpdateLibrary from './Library/views/UpdateLibrary'
import AbonnementStat from './Library/views/AbonnementStat'
import StatDashbord from './Library/views/StatDashbord';
import DashbordAge from './Library/views/DashboardAge'
import Dashboard from './Library/views/Dashboard';
import Pdf from './Library/views/Pdf';
import MapContainer from './Library/views/MapContainer';
function App()  {

  let { id } = useParams();

  return (


   <div>
     <Routes >
       
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/event' element={<Event></Event>}>
        </Route>
        <Route path='/rech' element={<SearchBar></SearchBar>}>

</Route>
        <Route path="/addevent" element={<AddEvent/>}></Route>
        <Route path='/' element={<SignIn></SignIn>}></Route>
        <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
       
        <Route path='/AddLibrary' element={<AddLibrary></AddLibrary>}></Route>
        <Route path='/AddCoach' element={<AddCoach></AddCoach>}></Route>
        <Route path='/AddCourse' element={<AddCourse></AddCourse>}></Route>
        <Route path='/ShowCmntr' element={<ShowCmntr></ShowCmntr>}></Route>

        <Route path='/library' element={<Library></Library>}></Route>
        <Route path='/updateL/:id' element={<UpdateLibrary/>}></Route>
        <Route path='/det/:Libraryid' element ={<Details></Details>}></Route>
        <Route path='/Aff/:Libraryid' element ={<Aff></Aff>}></Route>

        <Route path='/ShowCoach' element={<ShowCoach></ShowCoach>}></Route>
        <Route path='/ShowCourse' element={<ShowCourse></ShowCourse>}></Route>
        <Route path='/ShowLiabrary' element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path='/ShowEvent' element={<ShowEvent></ShowEvent>}></Route>
        <Route path='/UpdateUser' element={<UpdateUser></UpdateUser>}></Route>
        <Route path='/rem' element={<Rem></Rem>}></Route>
        <Route path='/Affc' element={<AffCmntr></AffCmntr>}></Route>
        <Route path='/adda/:Libraryid' element={<Addabonnement></Addabonnement>}></Route>
        <Route path='/showabb' element={<ShowAbo></ShowAbo>}></Route>
        <Route path='/updatea/:id' element ={<UpdateAbb></UpdateAbb>}></Route>
        <Route path='/cm' element={<Cm></Cm>}></Route>
        <Route path='/stat/:Libraryid' element={<AbonnementStat></AbonnementStat>}></Route>
        <Route path='/dashbord' element={<Dashboard></Dashboard>}></Route>
        <Route path='/pdf' element={<Pdf></Pdf>}></Route>
        <Route path='/map' element={<MapContainer></MapContainer>}></Route>

      </Routes>
   </div>   

  
  );
}

export default App;

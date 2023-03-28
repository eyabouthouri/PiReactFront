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
import Terms from './Home/Terms';
import Rem from './Home/Rem';
import AffCmntr from './Library/views/AffCmntr';
import ShowCmntr from './Library/views/ShowCmntr';
import FormInputComment from './Library/views/FormInputComment';
import Addabonnement from './Library/views/Addabonnement';
function App()  {

  let { id } = useParams();

  return (


   <div>
     <Routes >
       
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/event' element={<Event></Event>}>
          
        </Route>
        <Route path="/addevent" element={<AddEvent/>}></Route>
        <Route path='/' element={<SignIn></SignIn>}></Route>
        <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
       
        <Route path='/AddLibrary' element={<AddLibrary></AddLibrary>}></Route>
        <Route path='/AddCoach' element={<AddCoach></AddCoach>}></Route>
        <Route path='/AddCourse' element={<AddCourse></AddCourse>}></Route>
        <Route path='/ShowLiabrary' element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path='/ShowCmntr' element={<ShowCmntr></ShowCmntr>}></Route>
        <Route path='/in' element={<FormInputComment></FormInputComment>}></Route>

        <Route path='/library' element={<Library></Library>}></Route>
        <Route path='/updateL/:id' element={<AddLibrary/>}></Route>

        <Route path='/ShowCoach' element={<ShowCoach></ShowCoach>}></Route>
        <Route path='/ShowCourse' element={<ShowCourse></ShowCourse>}></Route>
        <Route path='/ShowLibrary' element={<ShowLiabrary></ShowLiabrary>}></Route>
        <Route path='/ShowEvent' element={<ShowEvent></ShowEvent>}></Route>
        <Route path='/UpdateUser' element={<UpdateUser></UpdateUser>}></Route>
        <Route path='/rem' element={<Rem></Rem>}></Route>
        <Route path='/Affc' element={<AffCmntr></AffCmntr>}></Route>
        <Route path='/adda' element={<Addabonnement></Addabonnement>}></Route>


      </Routes>
   </div>   

  
  );
}

export default App;

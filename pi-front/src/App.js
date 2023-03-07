import React, { Component } from 'react';

import Library from './Library/views/Library';
import Home  from './Home/Home';
import Event from './event/views/Event';
import Course from './course/views/Course';
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
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

function App()  {
  return (

 <Router>
      <div>
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/Home">
            <Home />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/event">
            <Event />
          </Route>
          <Route path="/course">
            <Course />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/addLibrary">
            <AddLibrary />
          </Route>
          <Route path="/addevent">
            <AddEvent />
          </Route>
          <Route path="/addcoach">
            <AddCoach />
          </Route>
          <Route path="/Showlibrary">
            <ShowLiabrary />
          </Route>
          <Route path="/ShowCoach">
            <ShowCoach />
          </Route>
          <Route path="/ShowCourse">
            <ShowCourse />
          </Route>
          <Route path="/ShowEvent">
            <ShowEvent />
          </Route>
          <Route path="/updateL/:id" component={AddLibrary} />
          
        </Switch>
      </div>
    </Router> 
   

  
  );
}

export default App;

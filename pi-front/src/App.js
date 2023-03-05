import React, { Component } from 'react';

import Library from './Library';
import Home  from './Home';
import Event from './Event';
import Course from './Course';
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
import NavbarModule from './components/NavbarModule';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddLibrary from './AddLibrary';
import AddEvent from './AddEvent';
import AddCoach from './AddCoach';
import AddCourse from './AddCourse';
import ShowLiabrary from './ShowLiabrary';
import ShowCoach from './ShowCoach';
import ShowCourse from './ShowCourse';
import ShowEvent from './ShowEvent';

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
        </Switch>
      </div>
    </Router> 
   

  
  );
}

export default App;

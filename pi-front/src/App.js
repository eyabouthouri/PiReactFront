import React, { Component } from 'react';

import Library from './Library';
import Home  from './Home';
import Event from './Event';
import Course from './Course';
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
import NavbarModule from './components/NavbarModule';

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
        </Switch>
      </div>
    </Router> 
   

  
  );
}

export default App;

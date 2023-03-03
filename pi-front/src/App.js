import React from 'react';
import Footer from './components/Footer'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
   <div className='container'> 
    <Sidebar/>
    <div className='container'> 
<Footer/>
    </div>
 
  </div>
  );
}

export default App;

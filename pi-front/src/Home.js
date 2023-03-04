import React from 'react';
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import About from './components/About';
function Home(props) {
    return (
        <div className='section-overlay'>
                   
<Navbar/>
      
 <div className='site-footer'> <Footer/>
 </div>
 </div>
 
    );
}

export default Home;
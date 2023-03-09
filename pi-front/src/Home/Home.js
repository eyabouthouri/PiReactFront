import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import About from '../components/About';
import axios from 'axios';
function Home(props) {
    const [user, setUser] = useState([]);

     const refreshtoken = async()=>{
        const res = await axios
        .get("http://localhost:5000/users/refresh", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
     }
    const sednRequest = async () => {
      const res = await axios
        .get("http://localhost:5000/users/listuser", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      console.log(res.data)
      return  res.data;
    };

    useEffect(() => {
      {
       
        sednRequest().then((d) => setUser(d));
        console.log(user)
        let interval = setInterval(() => {
            refreshtoken();
          }, 1000 * 29);
      }
    }, [])
    return (
        <div className='section-overlay'>
                   
<Navbar/>
      
 <div className='site-footer'> <Footer/>
 </div>
 </div>
 
    );
}

export default Home;
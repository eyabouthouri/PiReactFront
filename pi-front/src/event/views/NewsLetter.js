import React, { useEffect } from "react";
import Navbarback from "../../components/Navbarback";
import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "react-notifications-component";
import Navbar from "../../components/Navbar";

import axios from "axios";
function NewsLetter(props) {

    const initialState = {  email:"",
  };

     
const [input, setinput] = useState(initialState);
const [validd, setValid] = useState(true);
const currentUrl = window.location.href;

const history = useNavigate();
const [msg, setmsg] = useState("");
   const [state, setState] = useState(initialState);
   const subscribe = async () => {
      try {
        const res = await axios.post(
          "/events/subscribe",
          {
            email: input.email,
 
          },
          { withCredentials: true }
        );
        Store.addNotification({
            title: "Add sub",
            message: "Subscription added successfully",
            type: "success",
            insert: "bottom",
            container: "top-center", // or "top-right"
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
        });
       // history("/ShowEvent");
      } catch (err) {
        setValid(false);
        console.error(err.response.data);
        setmsg(err.response.data);
      }
    };
  

    const Handelsubmit = (e) => {
      e.preventDefault();
      subscribe();
    };
    const handleInputChange = (e) => {
      let { name, value } = e.target;
      setinput({ ...input, [name]: value });
    };
  





  return (
<div>

       
  
    
<div class="row"/>


<div class="col-sm-12">
    
<div class="col-sm-12">
<form onSubmit={Handelsubmit} id="form-wizard1" class="text-center mt-4"> 
<div class="iq-card iq-card-block iq-card-stretch iq-card-height bg-transparent" style={{ opacity: 0.8 }}>
<h1 class="mt-4 mb-1 text-white">Get our newsletter</h1>
<h4 class="mt-4 mb-1 text-white">Subscribe for our weekly update and be the first to know about our special events </h4>


                <div class="iq-card-header d-flex justify-content-between">
                   <div class="iq-header-title">
                 
</div>  

                  <div class="row">
<div class="col-md-8">
<input type="email" class="form-control mb-0" name="email" onChange={handleInputChange} value={input.email} placeholder=" Enter email address" />

</div>
<div class="col-md-4">
<button type="submit" class="btn btn-info btn-block">Subscribe</button>
</div>
</div>
                   <br>
                   </br>
                   </div>
                   <div>
                   <form class="iq-comingsoon-form mt-5">
                <div class="form-group">
                </div>
             </form>


</div>
</div>
</form>

            
</div>
</div>



</div>





  );
}

export default NewsLetter;










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
<Navbar></Navbar>

<div class="header-for-bg">

<div class="background-header position-relative">
   <img src="images/page-img/profile-bg3.jpg" class="img-fluid rounded w-100 rounded rounded" alt="profile-bg"/>
   <div class="title-on-header">
      <div class="data-block">
         <h3> Thank you for attending and we hope you'll  enjoy the experience !</h3>          
      </div>        
   </div>

</div>
<div>
<div>
</div>
</div>
<div class="row"/>
<div class="col-sm-12">
    
<div class="col-sm-12">
<form onSubmit={Handelsubmit} id="form-wizard1" class="text-center mt-4"> 
<div class="iq-card iq-card-block iq-card-stretch iq-card-height">
<h1 class="mt-4 mb-1">Get our newsletter</h1>
<h4 class="mt-4 mb-1">Subscribe for our weekly update and be the first to know about our special events </h4>


                <div class="iq-card-header d-flex justify-content-between">
                   <div class="iq-header-title">
                 
</div>                      <div class="row">
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
<br></br>  <br></br>   <br></br>         <br></br><br></br>
<footer class="bg-white iq-footer">
    <div class="container-fluid">
       <div class="row">
          <div class="col-lg-6">
             <ul class="list-inline mb-0">
                <li class="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                <li class="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
             </ul>
          </div>
          <div class="col-lg-6 text-right">
             Copyright 2020 <a href="#">
                Web Spirits</a> All Rights Reserved.
          </div>
       </div>
    </div>
 </footer>

</div>
</div>




  );
}

export default NewsLetter;









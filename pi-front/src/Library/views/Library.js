import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Topnav from '../../components/Topnav';



function Library(props) {

   const [data,setData]=useState([]);
useEffect(()=>{
   listL();
},[])


const listL = async()=>{
const response = await axios.get("http://localhost:5000/library/listL");
if(response.status ==200){
   setData(response.data);
}
}


   return (
      <div id="root">
            <Topnav/>
      
            <div class="header-for-bg">
            <div class="background-header position-relative">
               <img src="images/page-img/profile-bg7.jpg" class="img-fluid rounded w-100 rounded rounded" alt="profile-bg"/>
               <div class="title-on-header">
                  <div class="data-block">
                     <h2>Library</h2>
                  </div>
               </div>
            </div>
         
            <div   class="container">
            <div class="row">

               {data && data.map((item, index)=>{
               return(
                  <div class="col-sm-6">
                  <div class="card">
                     <div class="card-body">
                  <img class="card-img-top"  src={process.env.PUBLIC_URL+"/images/"+item.img}></img>

                     <div class="card-body">
                     <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">Adresse : {item.adresse} <br></br>email : {item.email} <br></br>Tel : {item.tel} </p>
                  

                        </div>  </div>
                     
                                          
                        <br></br>

                                             <form class="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                                                <input type="text" class="form-control rounded"/>
                                                <div class="comment-attagement d-flex">
                                                   <a href="javascript:void();"><i class="ri-link mr-3"></i></a>
                                                   <a href="javascript:void();"><i class="ri-user-smile-line mr-3"></i></a>
                                                   <a href="javascript:void();"><i class="ri-camera-line mr-3"></i></a>
                                                </div>
                                             </form>
                     </div></div>
                     
                                 )                           
                              })}                           
                     </div></div>
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
         
   );
}

export default Library;
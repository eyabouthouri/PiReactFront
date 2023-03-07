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
               <img src="images/page-img/profile-bg5.jpg" class="img-fluid rounded w-100 rounded rounded" alt="profile-bg"/>
               <div class="title-on-header">
                  <div class="data-block">
                     <h2>Your Photos</h2>
                  </div>
               </div>
            </div>
            <div   id="content-page" className="content-page">
  <div className="container">
     <div className="row">
        <div className="col-md-6 col-lg-4 mb-3">
           <div className="user-images position-relative overflow-hidden">

                         {data && data.map((item, index)=>{
                                                 return(
                                   <p key={index}>
                                  <h4 class="title-agile2">{item.name}</h4>
                                   <span> adresse : {item.adresse}</span>
                                  <span> email :{item.email} </span>
                                  <span> Tel :{item.tel}</span> 
                                  <span> {item.img}</span> 

                                         
                                    </p> 
                                  
   
                                 )
                                })}
                               
                               </div>
                                </div></div></div></div></div>
                    
                                     
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
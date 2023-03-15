import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Topnav from '../../components/Topnav';
import {toast} from "react-toastify";
import { useNavigate,Link,NavLink } from 'react-router-dom';
import AffCmntr from './AffCmntr';
axios.defaults.withCredentials = true;
const initialState= {
    description:"",
  
}


function Library(props) {

   const [data,setData]=useState([]);
useEffect(()=>{
   listL();
   
},[])

var history=useNavigate()

const [state, setState] = useState(initialState);
const { description}=initialState;
const addC = async (data)=> {
    const response = await axios.post("http://localhost:5000/commentaire/addc",data)
    toast.sucess(response.data);
    listL();

 }
const listL = async()=>{
const response = await axios.get("http://localhost:5000/library/listL");
if(response.status ==200){
   setData(response.data);
}
}
const listC = async()=>{
   const response = await axios.get("http://localhost:5000/commentaire/listc");
   if(response.status ==200){
      setData(response.data);
   }
   }
const  handleInputChange=(e) =>{
   let{name, value}=e.target;
   setState({...state, [name]:value });
};
const Handelsubmit=(e)=>{
          
   e.preventDefault();
  
      addC(state);


 
};


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
                     <h2 class="p1" >{item.name}</h2>
                        <p class="l1">Adresse : {item.adresse} <br></br>email : {item.email} <br></br>Tel : {item.tel}   </p>
                  
                        <div class="d-flex flex-wrap">
                     <ul class="post-comments p-0 m-0">
                                                   <li class="mb-2">
                                                      <div class="d-flex flex-wrap">
                                                          {<AffCmntr/>}
                                                          </div>
                                                   </li>
                                                </ul>
</div>          
                        </div>  </div>
                     
                                                                 
                     <form class="comment-text d-flex align-items-center mt-3"  methode="POST" onSubmit={Handelsubmit}>
                        
                        <input type="text" class="form-control rounded" name="description"  placeholder="commenter"   onChange={handleInputChange} value={state.description} />
                        <div class="comment-attagement d-flex">
                           <a href="javascript:void();"><i class="ri-link mr-3"></i></a>
                           <a href="javascript:void();"><i class="ri-user-smile-line mr-3"></i></a>
                           <a href="javascript:void();"><i class="ri-camera-line mr-3"></i></a>
                        </div>
   
                     </form>     
                        </div>
                                       
                        <br></br>


                     </div>
                     
                     
                  
                     
                   
                                 )                           
                              })}  




                     </div>
                     
                     
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
         
   );
}

export default Library;
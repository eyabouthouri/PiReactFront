import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { Link, useParams } from 'react-router-dom';
import {toast} from "react-toastify";

import Library from './Library';
axios.defaults.withCredentials = true;
const initialState= {
    description:""
  
}

function AffCmntr(props) {
   
   const [data,setData]=useState([]);
useEffect(()=>{
   listC();
   
},[])
const [state, setState] = useState(initialState);
const {description}=initialState;
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
 
   const deleteC = async (id)=> {
      
         const response = await axios.delete(`http://localhost:5000/commentaire/deleteC/${id}`,
         {withCredentials: true}).then(
            listC()
   
         
         )
         .catch((err)=>{
            console.error(err)
            
   
          }
         );
         return response.data;

   

   }     
 
  
  
   function refreshPage() {
      window.location.reload(false);
    }
     

       
    return (
      <div>
   
      <div class="user-img">
      {data && data.map((item, index)=>{
         return(
            <div class="d-flex flex-wrap">
            <div class="user-img">
               <img src="images/user/03.jpg" alt="userimg" class="avatar-35 rounded-circle img-fluid"/>
            </div>

            <div class="comment-data-block ml-3">
               <h7>Eya</h7>
      <p>{item.description}</p>
      <p class="mb-0"></p>
      <div class="d-flex flex-wrap align-items-center comment-activity">
         <a href="javascript:void();" onClick={() => deleteC(item._id)} onnClick={refreshPage}>delete</a>
         <a href="javascript:void();">reply</a>
         <a href="javascript:void();">translate</a>
         <span> 5 min </span>
         </div></div>

</div>
         )
    } )} </div>                  
</div>
    );
      
}

export default AffCmntr;
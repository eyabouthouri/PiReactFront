import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { Link, useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import Library from './Library';
function ShowLiabrary(props) {
   const [data,setData]=useState([]);
useEffect(()=>{
   listL();
},[])



const listL = async()=>{
   const response = await axios.get("http://localhost:5000/library/listL");
   if(response.status ==200){
      setData(response.data);
      
   }
   };
   
   const deleteL = async (id)=> {
      if(
         window.confirm("Are u sure that u wanted to delete")
      ){
         const response = await axios.delete(`http://localhost:5000/library/deleteL/${id}`,
         {withCredentials: true}).then(
            listL()
   
         
         )
         .catch((err)=>{
            console.error(err)
            
   
          }
         );
         return response.data;

   }

   }

  




    return (
        <div id="content-page" class="content-page">          

        <div id="root"> 
        <Navbarback/>
        <div id="root">
            <SideBar/>
            </div>
            </div>
           
            <div class="row">
                  <div class="col-sm-12">
                        <div class="inner-page-title">
                           <h3 class="text-white">Editable Table Page</h3>
                           <p class="text-white">lorem ipsum</p>
                        </div>

                        <div class="col-sm-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Editable Table</h4>
                           </div>
                        </div> </div>
                  <div class="container">
                           <div id="table" class="table-editable">
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                
                 
                                 <thead class="thead-dark">
                                    <tr>
                                         <th>Image</th>
                                       <th>name</th>
                                       <th>adresse </th>
                                       <th>email</th>
                                       <th>Tel</th>
                                       <th>id</th>
                                       <th>Action</th>

                                    </tr>
                                 </thead>
                                 
                                 <tbody>
                                {data && data.map((item, index)=>{
                                 return(
                                    <tr >
                                       <td>
                                        {" "}
                                       <img class="img-fluid img-thumbnail" src={process.env.PUBLIC_URL+"/images/"+item.img}></img>{" "} </td>
                                       <td class="contenteditable">{item.name}</td>
                                       <td class="contenteditable">{item.adresse}</td>
                                       <td class="contenteditable">{item.email}</td>
                                       <td class="contenteditable">{item.tel}</td>
                                       <td class="contenteditable">{item._id}</td>


                              
                                       <td>
                                          <Link to={`/updateL/${item._id}`}>
                                           <button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">update</button>    
                                             </Link> 
                                              <button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => deleteL(item._id)} >delete</button>
                                       </td>        
                                    </tr> 
                                 )
                                })}
                                
                                       
                                 </tbody>
                                 
                              </table>
                           </div> </div></div> </div></div>
                     </div>

    );
      
}

export default ShowLiabrary;
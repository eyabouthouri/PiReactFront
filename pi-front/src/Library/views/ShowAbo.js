import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { Link, useParams } from 'react-router-dom';
import {toast} from "react-toastify";
function ShowLiabrary(props) {
   const [data,setData]=useState([]);
useEffect(()=>{
    listA();
},[])



const listA = async()=>{
   const response = await axios.get("http://localhost:5000/abonnement/lista");
   if(response.status ==200){
      setData(response.data);
      
   }
   };
   
   const deleteA = async (id)=> {
      
         const response = await axios.delete(`http://localhost:5000/abonnement/deletea/${id}`,
         {withCredentials: true}).then(
            listA()
   
         
         )
         .catch((err)=>{
            console.error(err)
            
   
          }
         );
         return response.data;

   

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
                                       <th>First Name</th>
                                       <th>Last Name </th>
                                       <th>email</th>
                                       <th>Tel</th>
                                       <th>city</th>
                                       <th>Age</th>
                                       <th>Id</th>
                                       <th>Action</th>

                                    </tr>
                                 </thead>
                                 
                                 <tbody>
                                {data && data.map((item, index)=>{
                                 return(
                                    <tr >
                                       <td>
                                        {" "}
                                       <img class="img-fluid img-thumbnail" src={process.env.PUBLIC_URL+"/images/"+item.image}></img>{" "} </td>
                                       <td class="contenteditable">{item.nom}</td>
                                       <td class="contenteditable">{item.prenom}</td>
                                       <td class="contenteditable">{item.email}</td>
                                       <td class="contenteditable">{item.tel}</td>
                                       <td class="contenteditable">{item.city}</td>
                                       <td class="contenteditable">{item.age}</td>
                                       <td class="contenteditable">{item._id}</td>


                              
                                       <td>
                                          <Link to={`/updateL/${item._id}`}>
                                           <button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">update</button>    
                                             </Link> 
                                              <button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => deleteA(item._id)} >delete</button>
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
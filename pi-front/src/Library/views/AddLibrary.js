import React, { useEffect, useState }  from 'react';
import Fildest from '../../components/Fildest';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import StepDeux from '../../components/StepDeux';
import axios from 'axios';
import {toast} from "react-toastify";
import { useParams } from 'react-router-dom';

import { useNavigate,Link,NavLink } from 'react-router-dom';
import Library from './Library';
axios.defaults.withCredentials = true;
const initialState= {
   name:"",
   adresse:"",
   email:"",
   tel:"",
   img:""
}


function AddLibrary(props) {
   const [data,setData]=useState([]);

useEffect(()=>{
   listL();
},[])

   const [state, setState] = useState(initialState);
   const { name, adresse, email, tel,img}=initialState;
   const listL = async()=>{
      const response = await axios.get("http://localhost:5000/library/listL");
      if(response.status ==200){
         setData(response.data);
         
      }
      };

   const addL = async (data)=> {
      const response = await axios.post("http://localhost:5000/library/addl",data)
      toast.sucess(response.data);
      listL();

   }
   const updateL = async (data,id)=> {
      const response = await axios.put(`http://localhost:5000/library/updatel/${id}`, data);
      if(response.status ==200){
         toast.sucess(response.data);
         listL();

      }
   };
   var history=useNavigate()


   const { id } = useParams();
   useEffect(() =>{
      if (id) {

      getOneL(id);
   }
   },[id])
var self=this;
   const getOneL = async (id) => {
      const response = await axios.get(`http://localhost:5000/library/getOnel/${id}`);
         setState({ ...response.data[0]} );

      
   };




   const Handelsubmit=(e)=>{
          
      e.preventDefault();
     if(!id){
         addL(state);
     }else{
      updateL(state, id);


     }
     history("/ShowLiabrary");
    
   };
      const  handleInputChange=(e) =>{
         let{name, value}=e.target;
         setState({...state, [name]:value });
    };


   




    return (
      <div id="content-page" class="content-page">          
      <div id="root"> 
        <Navbarback/>
        <div id="root">
            <SideBar/>
            </div>
          </div>  
   
         <div class="container">
   
          <div class="col-sm-12 col-lg-12">
             <div class="iq-card">
                <div class="iq-card-header d-flex justify-content-between">
                   <div class="iq-header-title">
                      <h4 class="card-title">Add Liabrary</h4>
                   </div>
                </div>
                <div class="iq-card-body">
                      <ul id="top-tab-list" class="p-0">
                         <li class="active" id="account">
                            <a href="javascript:void();">
                            <i class="ri-lock-unlock-line"></i><span>Account</span>
                            </a>
                         </li>
                         <li id="personal">
                            <a href="javascript:void();">
                            <i class="ri-user-fill"></i><span>Personal</span>
                            </a>
                         </li>
                         <li id="payment">
                            <a href="javascript:void();">
                            <i class="ri-camera-fill"></i><span>Image</span>
                            </a>
                         </li>
                         <li id="confirm">
                            <a href="javascript:void();">
                            <i class="ri-check-fill"></i><span>Finish</span>
                            </a>
                         </li>
                      </ul>
        <form id="form-wizard1" class="text-center mt-4"  methode="POST" onSubmit={Handelsubmit}>

        <div class="form-card text-left">
     <div class="row">
        <div class="col-7">
           <h3 class="mb-4">Library  Information:</h3>
        </div>
      
     </div>
     <div class="row">
        <div class="col-md-6">

             <div class="form-group">
                <label htmlFor="tel" >tel: * </label>
                <input type="text" className="form-control"  name="tel"  placeholder="tel"   onChange={handleInputChange} value={state.tel} />
             </div>
          <div class="col-md-6">
             <div class="form-group">
                <label htmlFor="name" >nom: *</label>
                <input type="text" className="form-control"  name="name"  placeholder="name"   onChange={handleInputChange}  value={state.name}/>
             </div>
          </div>
          <div class="col-md-6">
             <div class="form-group">
                <label htmlFor="adresse">adresse: *</label>
                <input type="text" className="form-control"  name="adresse"  placeholder="adresse"  onChange={handleInputChange}  value={state.adresse}/>
             </div>
          </div>
          <div class="col-md-6">
             <div class="form-group">
                <label htmlFor="email">Email: *</label>
                <input type="email" className="form-control"   name="email" placeholder="email"   onChange={handleInputChange}  value={state.email}/>
             </div>
          </div>
          <div className="form-group">
           <label for="file-upload">Photo</label>
           <input id="file-upload" type="file" name="img"  onChange={handleInputChange}  value={state.img}></input>
           
           </div></div>
          </div>
           
  

           <input type="submit" value={id ? "Update" : "Add"}
                />  
                </div>  
         </form>
         </div>
                <div/>
   </div></div></div></div>


   
    
    );
}

export default AddLibrary;
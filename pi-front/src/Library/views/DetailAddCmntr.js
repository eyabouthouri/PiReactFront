import Library from './Library';
import axios from 'axios';
import React, { useEffect, useState,setState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { Link, useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import AffCmntr from './AffCmntr';
axios.defaults.withCredentials = true;

function DetailAddCmntr(props) {
   const { Libraryid ,id} = useParams();
   const [state, setState]=useState({  description:"",Libraryid, name:"",
   adresse:"",
   pays:"",
   email:"",
   tel:"",
  Image:""
})
const initialState= {
   name:"",
   adresse:"",
   pays:"",
   email:"",
   tel:"",
  Image:""
}

   const [data,setData,userconnecte, setUserconnecte]=useState([]);
   
    const addC = async (data)=> {
       const response = await axios.post("http://localhost:5000/commentaire/addc",data,
       {withCredentials: true}).then(
   
      
      )
      .catch((err)=>{
         console.error(err)
         console.log(err)
   
       }
      );
      return response.data;
   
    }
    const  handleInputChange=(e) =>{
       let{name, value}=e.target;
       setState({...state, [name]:value });
    };
    const [showPage, setShowPage] = useState(false);

    function handleaddclick() {
       setShowPage(true);
     }
     const Handelsubmit=(e)=>{
               
        e.preventDefault();
       
           addC(state);
     
     
      
     };
 

   return (
       <div id="root">


       <form class="comment-text d-flex align-items-center mt-3"  methode="POST" onSubmit={Handelsubmit}>
                       
                       <input type="text" class="form-control rounded" name="description"  placeholder="commenter"   onChange={handleInputChange} value={state.description} />
                       <div class="comment-attagement d-flex">
                          <a href="javascript:void();"><i class="ri-link mr-3"></i></a>
                          <a href="javascript:void();"><i class="ri-user-smile-line mr-3"></i></a>
                          <a href="javascript:void();"><i class="ri-camera-line mr-3"></i></a>
                       </div>
  
                    </form>          
   
</div>
   );
}


export default DetailAddCmntr;
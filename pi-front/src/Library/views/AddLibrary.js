import React ,{useState} from "react";
import axios from "axios";
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { useHistory,useLocation } from "react-router-dom";
import {toast} from "react-toastify";
axios.defaults.withCredentials = true;
const initialState= {
   name:"",
   adresse:"",
   email:"",
   tel:""
}
function AddLibrary(props) {


   const [state, setState] = useState(initialState);

   const { name, adresse, email, tel}=initialState;
   const history = useHistory();
   const addL = async (data)=> {
      const response = await axios.post("http://localhost:5000/library/addl",data)
      toast.sucess(response.data);
   }
    
   const Handelsubmit=(e)=>{
          
      e.preventDefault();
     
         addL(state);
         history.push("/Showlibrary");
      
    
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
            <form onSubmit={Handelsubmit}>
  
              <div class="row">
              <div class="col-md-6">

                 <div class="form-group">
                    <label htmlFor="tel" >tel: * </label>
                    <input type="text" className="form-control" id="tel " name="tel"  placeholder="tel"   onChange={handleInputChange} value={tel} />
                 </div>
              <div class="col-md-6">
                 <div class="form-group">
                    <label htmlFor="name" >nom: *</label>
                    <input type="text" className="form-control"  id="name" name="name"  placeholder="name"   onChange={handleInputChange}  value={name}/>
                 </div>
              </div>
              <div class="col-md-6">
                 <div class="form-group">
                    <label htmlFor="adresse">adresse: *</label>
                    <input type="text" className="form-control" id="adresse" name="adresse"  placeholder="adresse"  onChange={handleInputChange}  value={adresse}/>
                 </div>
              </div>
              <div class="col-md-6">
                 <div class="form-group">
                    <label htmlFor="email">Email: *</label>
                    <input type="email" className="form-control"  id="email" name="email" placeholder="email"   onChange={handleInputChange}  value={email}/>
                 </div>
              </div>
                </div>
        </div>
      

               <button type="submit" className="btn btn-primary btn-lg"
                    >Ajouter</button>     
             </form>
             </div>
                    <div/>
       </div></div></div></div>
   
   
    );
}

export default AddLibrary;
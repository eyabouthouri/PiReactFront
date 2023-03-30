import React, { useEffect, useState }  from 'react';
import Fildest from '../../components/Fildest';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import StepDeux from '../../components/StepDeux';
import { useNavigate,Link,NavLink } from 'react-router-dom';

import axios from 'axios';
import {toast} from "react-toastify";
import { useParams } from 'react-router-dom';axios.defaults.withCredentials = true;
const initialState= {
   nom:"",
   prenom:"",
   age:"",
   tel:"",
   city:"",
   email:"",
   image:"",

}

function Addabonnement() {
  const [showPage, setShowPage] = useState(false);
  const [data,setData]=useState([]);
  const [state, setState] = useState(initialState);
  const { nom, prenom, age, tel,email, city,image}=initialState;
 

  const addL = async (data)=> {
     const response = await axios.post("http://localhost:5000/abonnement/adda",data)
     toast.sucess(response.data);

  }
  function handleaddclick() {
    setShowPage(true);
  }
  var history=useNavigate()

  const Handelsubmit=(e)=>{
          
   e.preventDefault();
      addL(state);
 
  history("/library");
 
};
   const  handleInputChange=(e) =>{
      let{name, value}=e.target;
      setState({...state, [name]:value });
 };




  return (
    <div>
    
    <div   class="container">
            <div class="row">   
            <div class="col-lg-12">
                     <div class="iq-edit-list-data">
                        <div class="tab-content">
                           <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                              <div class="iq-card">
                                 <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                       <h4 class="card-title">Personal Information</h4>
                                    </div>
                                 </div>
                                 <div class="iq-card-body">
                                 <form id="form-wizard1" class="text-center mt-4"  methode="POST" onSubmit={Handelsubmit}>
                                       <div class="form-group row align-items-center">
                                          <div class="col-md-12">
                                          <div className="form-group">
                                          <i class="ri-pencil-line "></i>    <input id="file-upload" type="file" name="image"  onChange={handleInputChange}  value={state.image} />   
                                                </div>
                                            </div>

                                       </div>
                                       <div class=" row align-items-center">
                                          <div class="form-group col-sm-6">
                                             <label for="fname">First Name:</label>
                                             <input type="text" class="form-control" id="fname"  name="nom"   onChange={handleInputChange}  value={state.nom}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="lname">Last Name:</label>
                                             <input type="text" class="form-control" id="lname"  name="prenom"  onChange={handleInputChange}  value={state.prenom}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="uname">Email:</label>
                                             <input type="text" class="form-control" id="uname" placeholder='exemple@exmpl.com' name="email"  onChange={handleInputChange}  value={state.email} />
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="cname">City:</label>
                                             <input type="text" class="form-control" id="cname" name="city"  onChange={handleInputChange}  value={state.city}/>
                                          </div>
                                      
                                          <div class="form-group col-sm-6">
                                             <label for="dob">Age</label>
                                             <input  class="form-control" id="dob"  name="age"  onChange={handleInputChange}  value={state.age}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="tel">Tel</label>
                                             <input  class="form-control" id="tel"  name="tel"  onChange={handleInputChange}  value={state.tel}/>
                                          </div>
                                        
                                       
                                        
                                       </div>
                                       <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                       <button type="reset" class="btn iq-bg-danger">Cancle</button>
                                    </form>
                                 </div>
                              </div>
                           </div>
                          
                                 </div>
                              </div>
                           </div>
                        
                                 </div>
                              </div>
                           </div>

  );
}
export default Addabonnement
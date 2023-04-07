import React, { useEffect, useState }  from 'react';
import Fildest from '../../components/Fildest';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import StepDeux from '../../components/StepDeux';
import Topnav from '../../components/Topnav';

import { useNavigate,Link,NavLink } from 'react-router-dom';

import axios from 'axios';
import {toast} from "react-toastify";
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;


function Addabonnement() {
  const [showPage, setShowPage] = useState(false);
  const [data,setData]=useState([]);
  const { Libraryid ,id} = useParams();

  const [state, setState] = useState({nom:"",
  prenom:"",
  age:"",
  tel:"",
  city:"",
  email:"",
  image:"",
  Libraryid
});

  const addA = async (data)=> {
     const response = await axios.post("http://localhost:5000/abonnement/adda",data)
     toast.sucess(response.data);

  }
  function handleaddclick() {
    setShowPage(true);
  }
  var history=useNavigate()

  const Handelsubmit=(e)=>{
          
   e.preventDefault();
   addA(state);
 
  history("/library");
 
};
   const  handleInputChange=(e) =>{
      let{name, value}=e.target;
      setState({...state, [name]:value });
 };
 const countrySelect = document.querySelector('#country-select');

 function fillCountrySelect() {
   fetch('https://restcountries.com/v2/all')
     .then(response => response.json())
     .then(countries => {
       // Vider la liste déroulante
       // Ajouter l'option par défaut
       const defaultOption = document.createElement('option');
       defaultOption.value = '';
       defaultOption.textContent = '-- Sélectionnez un pays --';
       countrySelect.appendChild(defaultOption);
       // Ajouter les options des pays
       countries.forEach(country => {
         const option = document.createElement('option');
         option.value = country.name;
         option.textContent = country.name;
         countrySelect.appendChild(option);
       });
     });
 }
 
 // Appeler la fonction pour remplir la liste déroulante lors du chargement de la page
 fillCountrySelect();

  return (
   <div id="root">

<Topnav/>
<br></br><br></br><br></br><br></br>
<br></br><br></br>

    <div   class="container">

            <div class="row">   
            <div class="col-lg-12">
                     <div class="iq-edit-list-data">
                        <div class="tab-content">
                           <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                              <div class="iq-card">
                                 <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                       <h4 class="card-title" ><i class="bi bi-file-earmark-person-fill"></i>  Abonnement</h4>
                                    </div>

                                 </div>
                                 <img src="images/janko-ferlic-sfL_QOnmy00-unsplash.jpg" width= "970px" height="200px" ></img>

                                 <div class="iq-card-body">
                                 <form id="form-wizard1" class="text-center mt-4"  methode="POST" onSubmit={Handelsubmit}>
                                       <div class="form-group row align-items-center">
                                          <div class="col-md-12">
                                          <div className="form-group">
                                          <i class="bi bi-filetype-jpg"></i><input id="file-upload" type="file" name="image"   onChange={handleInputChange}  value={state.image} />   
                                               </div>
                                            </div>

                                       </div>
                                       <div class=" row align-items-center">
                                          <div class="form-group col-sm-6">
                                             <label for="fname"><i class="bi bi-person-bounding-box"></i>  First Name:</label>
                                             <input type="text" class="form-control" id="fname"  name="nom"  placeholder='First Name'  onChange={handleInputChange}  value={state.nom}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="lname"><i class="bi bi-person-bounding-box"></i>  Last Name:</label>
                                             <input type="text" class="form-control" id="lname"  name="prenom"  placeholder='Last Name' onChange={handleInputChange}  value={state.prenom}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="uname"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                                             <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                                             <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                                                </svg>  Email:</label>
                                             <input type="text" class="form-control" id="uname" placeholder='exemple@exmpl.com' name="email"  onChange={handleInputChange}  value={state.email} />
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="country-select"><i class="bi bi-joystick"></i> pays:</label>                               
                                             <select class="form-control"  id="country-select" name="city"   placeholder='City'  onChange={handleInputChange}  value={state.city} >
                                          <option selected="" >-- Sélectionnez un pays --</option>

                                             </select>

                                          </div>
      
                                          <div class="form-group col-sm-6">
                                             <label for="dob"><i class="bi bi-person-bounding-box"></i> Age:</label>
                                             <input  class="form-control" type="number" id="dob"  name="age"  placeholder='Age' onChange={handleInputChange}  value={state.age}/>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label><i class="bi bi-calendar-week"></i> Duration:</label>
                                             <select class="form-control" id="exampleFormControlSelect1" name="Duration"  onChange={handleInputChange}  value={state.Duration}>
                                                <option selected=""></option>
                                                 <option>3 moins</option>
                                                <option>6 moins</option>
                                                <option>1 ans</option>
                                             </select>
                                          </div>
                                          <div class="form-group col-sm-6">
                                             <label for="tel"> <i class="bi bi-telephone-inbound-fill"></i>Tel:</label>
                                             <input  class="form-control" id="tel"  name="tel"   placeholder='Tel' onChange={handleInputChange}  value={state.tel}/>
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
export default Addabonnement
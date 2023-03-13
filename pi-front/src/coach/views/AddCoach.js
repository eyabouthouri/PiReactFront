import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import axios from 'axios';

function AddCoach(props) {
   const initialState={ name:"", lastname:"", email:"",username:"", pwd:""};
    
   const [input, setinput] = useState(initialState);
  
   const history = useNavigate();
   const addclient=async() =>{
       const res= await axios.post("http://localhost:5000/users/add/admin",{
   
           name: input.name,
           lastname:input.lastname,
           email:input.email,
           username:input.username,
           pwd: input.pwd,
           image:input.image

       },{withCredentials: true}).catch((err)=>{
           console.error(err)
           
         }

           
        

       )
       history("/ShowCoach")
}  
   const Handelsubmit=(e)=>{
          
      e.preventDefault();
     addclient().then(ress => {
       console.log(ress.data)
     
     })
    
   
   };
      const  handleInputChange=(e) =>{
         let{name, value}=e.target;
         setinput({...input, [name]:value });
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
                   <h4 class="card-title">Add Admin</h4>
                </div>
             </div>
             <div class="iq-card-body">
                <form  onSubmit={Handelsubmit} id="form-wizard1" class="text-center mt-4">
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
                   <fieldset>
 <div class="form-card text-left">
    <div class="row">
       <div class="col-7">
          <h3 class="mb-4">ADMIN :</h3>
       </div>
     
    </div>
    <div class="row">
       <div class="col-md-6">
          <div class="form-group">
             <label>Email: *</label>
             <input type="text" class="form-control mb-0" name="email" onChange={handleInputChange} value={input.email} placeholder="Your Full Name"/>
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Username: *</label>
             <input type="text" class="form-control mb-0" name="username" onChange={handleInputChange} value={input.username} placeholder="Your Full Name"/>
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Password: </label>
             <input type="password" class="form-control mb-0" name="pwd" onChange={handleInputChange} value={input.pwd} placeholder="Your Full Name"/>
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Confirm Password: *</label>
             <input type="password" class="form-control" name="cpwd" placeholder="Confirm Password" />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>First Name: *</label>
             <input type="text" class="form-control mb-0" name="name" onChange={handleInputChange} value={input.name} placeholder="Your Full Name"/>
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Last Name: *</label>
             <input type="text" class="form-control mb-0" name="lastname" onChange={handleInputChange} value={input.lastname} placeholder="Your Full Name"/>
          </div>
       </div>
       
      
    </div>
    <div class="col-7">
          <h3 class="mb-4">Image Upload:</h3>
       </div>
   
    </div>
    <div class="form-group">
       <label>Upload Library  Photo:</label>
       <input type="file" class="form-control mb-0" name="image" onChange={handleInputChange} value={input.image} placeholder="Your Full Name"/>
    </div>
    
 <button type="submit" name="next" class="btn btn-primary next action-button float-right"  >Ajouter</button>
</fieldset>


         
               
                </form>
             <div/>
</div></div></div></div></div>
   

    );
}

export default AddCoach;
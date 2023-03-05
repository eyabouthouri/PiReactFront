import React from 'react';
import Navbarback from './components/Navbarback';
import SideBar from './components/SideBar';
function AddCoach(props) {
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
                <form id="form-wizard1" class="text-center mt-4">
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
          <h3 class="mb-4">Library  Information:</h3>
       </div>
     
    </div>
    <div class="row">
       <div class="col-md-6">
          <div class="form-group">
             <label>Email: *</label>
             <input type="email" class="form-control" name="email" placeholder="Email Id" />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Username: *</label>
             <input type="text" class="form-control" name="uname" placeholder="UserName" />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Password: *</label>
             <input type="password" class="form-control" name="pwd" placeholder="Password" />
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
             <input type="text" class="form-control" name="fname" placeholder="First Name" />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Last Name: *</label>
             <input type="text" class="form-control" name="lname" placeholder="Last Name" />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Contact No.: *</label>
             <input type="text" class="form-control" name="phno" placeholder="Contact No." />
          </div>
       </div>
       <div class="col-md-6">
          <div class="form-group">
             <label>Alternate Contact No.: *</label>
             <input type="text" class="form-control" name="phno_2" placeholder="Alternate Contact No." />
          </div>
       </div>
    </div>
    <div class="col-7">
          <h3 class="mb-4">Image Upload:</h3>
       </div>
   
    </div>
    <div class="form-group">
       <label>Upload Library  Photo:</label>
       <input type="file" class="form-control" name="pic" accept="image/*"/>
    </div>
    
 <button type="button" name="next" class="btn btn-primary next action-button float-right"  >Ajouter</button>
</fieldset>


         
               
                </form>
             <div/>
</div></div></div></div></div>
   

    );
}

export default AddCoach;
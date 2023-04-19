import React from 'react';
import { Link } from 'react-router-dom';
function SideBar(props) {
    return (
        <div class="iq-sidebar">
        <div id="sidebar-scrollbar">
           <nav class="iq-sidebar-menu">
              <ul id="iq-sidebar-toggle" class="iq-menu">
               
                 <li>
                    <li><a href="/dashbord"><i class="ri-table-line"></i>Dashbord</a></li>
                    <a href="profile.html" class="iq-waves-effect"><i class="las la-user"></i><span>Profile</span></a>
                 </li> 
               
               
                
                 <li class="active">
        
                     
                      
                       <li>
                             <li><a href='/AddLibrary'><i class="ri-clockwise-line"></i>Add Liabrary</a></li>
                             <li > <Link  class="ri-clockwise-line" to="/AddCoach">add admin </Link> </li>
                             <li > <Link  class="ri-clockwise-line" to="/ShowCoach">show users </Link> </li>
                              <li > <Link  class="ri-clockwise-line" to="/AddCoach">add admin </Link> </li>
                       </li>
                       <li class="active">
                          <a href="#tables" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="true"><i class="ri-table-line"></i><span>Show Table</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                          <ul id="tables" class="iq-submenu collapse show" data-parent="#ui-elements">
                          <li><a href="/ShowLiabrary"><i class="ri-table-line"></i>Liabrary</a></li>

                             <li><a href="/ShowCmntr"><i class="ri-table-line"></i>Commentaires</a></li>
                             <li ><a href="/showabb"><i class="ri-database-line"></i>abonnement</a></li>                             <li class="active"><a href="data-table.html"><i class="ri-database-line"></i>event</a></li>
                             <li><a href="table-editable.html"><i class="ri-refund-line"></i>Course </a></li>
                             <li><a href="table-coach.html"><i class="ri-refund-line"></i>Coach </a></li>

                          </ul>
                       </li>
                      
                 </li>
                 
              
                    
                    </ul>
               
                 
           </nav>
          
        </div>
     </div>
    );
}

export default SideBar;
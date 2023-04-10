import React from 'react';
import { Link } from 'react-router-dom';
function SideBar(props) {
    return (
        <div class="iq-sidebar">
        <div id="sidebar-scrollbar">
           <nav class="iq-sidebar-menu">
              <ul id="iq-sidebar-toggle" class="iq-menu">
               
                 <li>
                    <a href="profile.html" class="iq-waves-effect"><i class="las la-user"></i><span>Profile</span></a>
                 </li> 
               
               
                
                 <li class="active">
        
                     
                      
                       <li>
                         
                             <li > <Link  class="ri-clockwise-line" to="/AddCoach">add admin </Link> </li>
                             <li > <Link  class="ri-clockwise-line" to="/ShowCoach">show users </Link> </li>
                              <li > <Link  class="ri-clockwise-line" to="/ajoutercoach">add admin </Link> </li>
                       </li>
                       <li class="active">
                          <a href="#tables" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="true"><i class="ri-table-line"></i><span>Show Table</span><i class="ri-arrow-right-s-line iq-arrow-right"></i></a>
                          <ul id="tables" class="iq-submenu collapse show" data-parent="#ui-elements">
                             <li><a href="tables-liabrary.html"><i class="ri-table-line"></i>Liabrary</a></li>
                             <li class="active"><a href="data-table.html"><i class="ri-database-line"></i>event</a></li>
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
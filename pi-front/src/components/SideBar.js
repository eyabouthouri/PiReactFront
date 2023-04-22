import React from "react";
import { Link } from "react-router-dom";
import { FaComment } from 'react-icons/fa';
function SideBar(props) {
  return (
    <div class="iq-sidebar">
    <div id="sidebar-scrollbar">
       <nav class="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" class="iq-menu">
           
          <li class="">
              <Link class="-waves-effect" to="/dashbord">
              <i class="bi bi-bar-chart-steps"></i>
                <span>Dashboard</span>
              </Link>
            </li>
           
           
            
           
            <li class="">
              <Link class="-waves-effect" to="/ShowLiabrary">
                <i class="bi bi-journal-richtext"></i>
                <span>Libraries</span>
              </Link>
            </li>
            <ul id="tables" class="iq-submenu collapse show" data-parent="#ui-elements">
              <li>
                <Link to="/AddLibrary">
                  {" "}
                  <i class="bi bi-cloud-plus"></i>
                  Add Library
                </Link>
              </li>
              <li>
                <Link to="/ShowCmntr">
                  <i class="bi bi-card-text"></i>
                  Comments
                </Link>
              </li>
              <li>
                <Link to="/showabb">
                  <i class="bi bi-card-checklist"></i>
                  Subscriptions
                </Link>
              </li>
            </ul>
            <li>
              <Link class="-waves-effect" to="/ShowCourse">
                <i class="bi bi-youtube"></i>
                <span>Courses</span>
              </Link>{" "}
            </li>
            <li>
              <Link class="-waves-effect" to="">
                <i class="bi bi-calendar-event"></i>
                <span>Events</span>
              </Link>
            </li>

            <li>
              <Link class="-waves-effect" to="/ShowCoach">
                <i class="las la-user"></i>
              
                <span>  users</span>
              </Link>
            </li>
            <li > <Link  class="ri-clockwise-line" to="/AddCoach"> <i class="las la-user"></i>
              
              <span>  add admin</span></Link> </li>
                          <li > <Link  class="ri-clockwise-line" to="/ajoutercoach"><i class="las la-user"></i>
              
              <span>  add coach</span> </Link> </li>
                          <li>
              <Link class="-waves-effect" to="/chat">
              
              
                <span>     <FaComment /> chat</span>
              </Link>
            </li>
                      
          </ul>

        </nav>
      </div>
    </div>
  );
}

export default SideBar;

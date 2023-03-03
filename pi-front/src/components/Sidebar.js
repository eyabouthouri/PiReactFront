import React from 'react';

function Sidebar() {
    return (
        <div class="container">
           <nav class="navbar navbar-expand-lg">                
                <div class="container"/>
                    <a class="navbar-brand d-flex align-items-center" href="index.html">
                        <img src="images/logo.png" class="navbar-brand-image img-fluid" alt="Tiya Golf Club"/>
                       
                    </a>

                   
    
                   
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                          <li class="nav-item active">
                            <a class="nav-link"  href="profile-images.html">Library <span class="sr-only">(current)</span></a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="profile-event.html" >Event</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="profile-video.html">course</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link " href="friend-list.html">coach</a>
                          </li>
                        </ul>
                     </div>
            </nav>
             
</div>     
    );
}

export default Sidebar;

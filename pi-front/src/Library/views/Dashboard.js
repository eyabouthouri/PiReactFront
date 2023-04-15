import React from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import DashboardAge from './DashboardAge';
import StatDashbord from './StatDashbord';
function Dashboard(props) {
    return (
<div id="content-page" class="content-page">
  <Navbarback />
 
      <SideBar /> 
      <div className="row">
        <div className="col-md-8">
            Pourcentage d age:
          <DashboardAge/>
        </div>
        <div className="col-md-12">
          <StatDashbord/>
        
    </div>
  </div>            
</div>

    );
}

export default Dashboard;
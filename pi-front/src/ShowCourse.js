import React from 'react';
import Navbarback from './components/Navbarback';
import SideBar from './components/SideBar';
function ShowCourse(props) {
    return (
        <div id="content-page" class="content-page">          

        <div id="root"> 
        <Navbarback/>
        <div id="root">
            <SideBar/>
            </div>
            </div>
            <div class="row">
                  <div class="col-sm-12">
                        <div class="inner-page-title">
                           <h3 class="text-white">Editable Table Page</h3>
                           <p class="text-white">lorem ipsum</p>
                        </div>

                        <div class="col-sm-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Editable Table</h4>
                           </div>
                        </div> </div>
                  <div class="iq-card-body">
                           <div id="table" class="table-editable">
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                
                 
                                 <thead>
                                    <tr>
                                       <th>Name</th>
                                       <th>Age</th>
                                       <th>Company Name</th>
                                       <th>Country</th>
                                       <th>City</th>
                                       <th>Sort</th>
                                       <th>Remove</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td contenteditable="true">Gio Metric</td>
                                       <td contenteditable="true">25</td>
                                       <td contenteditable="true">Deepends</td>
                                       <td contenteditable="true">Spain</td>
                                       <td contenteditable="true">Madrid</td>
                                       <td>
                                          <span class="table-up"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a></span>
                                          <span class="table-down"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></a></span>
                                       </td>
                                       <td>
                                          <span class="table-remove"><button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td contenteditable="true">Manny Petty</td>
                                       <td contenteditable="true">45</td>
                                       <td contenteditable="true">Insectus</td>
                                       <td contenteditable="true">France</td>
                                       <td contenteditable="true">San Francisco</td>
                                       <td>
                                          <span class="table-up"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a></span>
                                          <span class="table-down"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></a></span>
                                       </td>
                                       <td>
                                          <span class="table-remove"><button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td contenteditable="true">Lucy Tania</td>
                                       <td contenteditable="true">26</td>
                                       <td contenteditable="true">Isotronic</td>
                                       <td contenteditable="true">Germany</td>
                                       <td contenteditable="true">Frankfurt am Main</td>
                                       <td>
                                          <span class="table-up"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a></span>
                                          <span class="table-down"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></a></span>
                                       </td>
                                       <td>
                                          <span class="table-remove"><button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                       </td>
                                    </tr>
                                    <tr class="hide">
                                       <td contenteditable="true">Anna Mull</td>
                                       <td contenteditable="true">35</td>
                                       <td contenteditable="true">Portica</td>
                                       <td contenteditable="true">USA</td>
                                       <td contenteditable="true">Oregon</td>
                                       <td>
                                          <span class="table-up"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></a></span>
                                          <span class="table-down"><a href="#!" class="indigo-text"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></a></span>
                                       </td>
                                       <td>
                                          <span class="table-remove"><button type="button"
                                             class="btn iq-bg-danger btn-rounded btn-sm my-0">Remove</button></span>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div> </div></div> </div></div>
                     </div>
    );
}

export default ShowCourse;
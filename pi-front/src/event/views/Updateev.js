import React, { useEffect, useState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
const initialState = { title: "", description:"", location: "",organizer:"", date:"",  img:""};

function Updateev(props) {
 
  const [state, setState] = useState(initialState);
  const [msg, setmsg] = useState({});
  const [valid, setValid] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  const updateev = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/events/updateev/${id}`, data);
      history('/ShowEvent');
    } catch (err) {
      setValid(false);
      setmsg(err.response.data);
      
    }
  };
  const listoneev = async () => {
    const one = await axios
      .get(`http://localhost:5000/events/one/${id}`, {
        withCredentials: true,
      })
     
      .catch((err) => {
        console.error(err);
      });
      console.log(one.data)
    return one.data;
  };
  useEffect(() => {
    if (id) {
      listoneev();
    }
  }, [id]);
  

  const {
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });

  const Handelsubmit = (e) => {
    e.preventDefault();

    updateev(state, id);
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };


    return (
      <div id="content-page" className="content-page">          
        <div id="root"> 
          <Navbarback/>
          <div id="root">
            <SideBar/>
          </div>
        </div>
    
        <div className="container">
          <div className="row">   
            <div className="col-lg-12">
              <div className="iq-edit-list-data">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                    <div className="iq-card">
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h4 className="card-title" ><i className="bi bi-file-earmark-person-fill"></i>  update event</h4>
                        </div>
                      </div>
    
                      <div className="iq-card-body">
                        <form id="form-wizard1" classNameName="text-center mt-4" method="PUT" onSubmit={Handelsubmit}>
                          <div className="row align-items-center">
                            <div className="form-group col-sm-6">
                              <label htmlFor="title"><i class="bi bi-clipboard"></i>  title:</label>
                              <input type="text" className="form-control" name="title" placeholder="title"  value={state.title || ''} onChange={(e) => setState({ ...state, title: e.target.value })}/>
                              

                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="name"><i className="bi bi-person-bounding-box"></i>  organizer:</label>
                              <input type="text" className="form-control" name="organizer" placeholder="organizer"  value={state.organizer || ''} onChange={(e) => setState({ ...state, organizer: e.target.value })}/>

                            </div>
                          
                            <div className="form-group col-sm-6">
                              <label htmlFor="tel"><i class="bi bi-chat-left-text"></i> description:</label>
                              <input type="text" className="form-control" name="description" placeholder="description" ovalue={state.description || ''} onChange={(e) => setState({ ...state, description: e.target.value })}/>

                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="date"> <i class="bi bi-calendar-date-fill"></i> date:</label>
                              <input type="date" className="form-control" name="date" placeholder="date" ovalue={state.date || ''} onChange={(e) => setState({ ...state, date: e.target.value })}/>

                            </div>
                            
                          
                            <div className="form-group col-sm-6">
                              <label htmlFor="location"><i class="bi bi-map-fill"></i> location:</label>
                              <textarea type="text" className="form-control" name="location" placeholder="write your  location please..." value={state.location || ''} onChange={(e) => setState({ ...state, location: e.target.value })}/>

                            </div>
                            <div class="col-7">
               <h3 class="mb-4"><i class="bi bi-card-image"></i> Image Upload:</h3>
            </div>
            <div class="form-group">
         <label for="file-upload"><i class="bi bi-card-image"></i> Photo</label>
         <input  type="file" name="img" value={state.img || ''} onChange={(e) => setState({ ...state, img: e.target.value })}></input>

         </div>
                                        </div>
                                     <input type="submit"  value={id ? "Update" : "Add"} ></input>
                                     <button type="reset" className="btn iq-bg-danger">Cancle</button>
                                  </form>
                                  
                                
                               </div>
                            </div>
                         </div>
                        
                               </div>
                            </div>
                         </div>
                      </div></div>
                     
                            <br></br>                           
                            <br></br>
                            <br></br>
                            <br></br> 
                            <br></br>
                            <footer className="bg-white iq-footer">
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-6">
                  <ul className="list-inline mb-0">
                     <li className="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                     <li className="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
                  </ul>
               </div>
               <div className="col-lg-6 text-right">
                  Copyright 2020 <a href="#">
                     Web Spirits</a> All Rights Reserved.
               </div>
            </div>
         </div>
      </footer>
       </div>    );
}

export default Updateev;
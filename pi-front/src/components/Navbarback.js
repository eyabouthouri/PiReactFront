import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoggedin } from "../redux/session";
import { useDispatch } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ShowCoach from "../coach/views/ShowCoach";
function Navbarback(props) {
  const dispatch = useDispatch();

  const [userconnecte, setUserconnecte] = useState([]);
   
  
  var history = useNavigate;
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
    });
  }, []);
  
 

  const userconnectee = async () => {
    const res = await axios
      .get("/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    if (res.data == []) {
      history("/");
    }
    return res.data;
  };
 
  const navigate = useNavigate();
  const logout = async () => {
    const res = await axios
      .get("/users/logout", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    dispatch(setIsLoggedin());
    setUserconnecte(false);
    navigate("/");
  };


  return (
    <div class="iq-top-navbar">
      <div class="iq-navbar-custom">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
          <div class="iq-navbar-logo d-flex justify-content-between">
            <a href="#">
              <img src="images/yc.png" class="img-fluid" alt="" />
              <span>YouthConnect</span>
            </a>
            <div class="iq-menu-bt align-self-center">
              <div class="wrapper-menu">
                <div class="main-circle">
                  <i class="ri-menu-line"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="iq-search-bar">
     
            <form action="#" class="searchbox">
              <div>
              <input type="text" class="text search-input" placeholder="Type here to search..." />
              
             
              </div>
              
              <a class="search-link" href="#">
              
              </a>
            </form>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
            <i class="ri-menu-3-line"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          
            <ul class="navbar-nav ml-auto navbar-list">
            <li>
            <a  class="iq-waves-effect d-flex align-items-center">
                  <div class="caption">

             
          
             
                  </div>
              </a>
              </li>
              <li>
                <a href="#" class="iq-waves-effect d-flex align-items-center">
                  <img src={process.env.PUBLIC_URL + "/imagee/" + userconnecte.image} class="img-fluid rounded-circle mr-3" alt="user" />

                  <div class="caption">
                    <h6 class="mb-0 line-height">
                      {userconnecte.name} {userconnecte.lastname}
                    </h6>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" class="iq-waves-effect d-flex align-items-center">
                  <i class="ri-home-line"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="search-toggle iq-waves-effect" href="#">
                  <i class="ri-group-line"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="search-toggle iq-waves-effect">
                  <div id="lottie-beil"></div>
                  <span class="bg-danger dots"></span>
                </a>
                <div class="iq-sub-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white">
                          All Notifications<small class="badge  badge-light float-right pt-1">4</small>
                        </h5>
                      </div>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/01.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Emma Watson Bni</h6>
                            <small class="float-right font-size-12">Just Now</small>
                            <p class="mb-0">95 MB</p>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/02.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">New customer is join</h6>
                            <small class="float-right font-size-12">5 days ago</small>
                            <p class="mb-0">Cyst Bni</p>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/03.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Two customer is left</h6>
                            <small class="float-right font-size-12">2 days ago</small>
                            <p class="mb-0">Cyst Bni</p>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/04.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">New Mail from Fenny</h6>
                            <small class="float-right font-size-12">3 days ago</small>
                            <p class="mb-0">Cyst Bni</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a href="#" class="search-toggle iq-waves-effect">
                  <div id="lottie-mail"></div>
                  <span class="bg-primary count-mail"></span>
                </a>
                <div class="iq-sub-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white">
                          All Messages<small class="badge  badge-light float-right pt-1">5</small>
                        </h5>
                      </div>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/01.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Bni Emma Watson</h6>
                            <small class="float-left font-size-12">13 Jun</small>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/02.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Lorem Ipsum Watson</h6>
                            <small class="float-left font-size-12">20 Apr</small>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/03.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Why do we use it?</h6>
                            <small class="float-left font-size-12">30 Jun</small>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/04.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Variations Passages</h6>
                            <small class="float-left font-size-12">12 Sep</small>
                          </div>
                        </div>
                      </a>
                      <a href="#" class="iq-sub-card">
                        <div class="media align-items-center">
                          <div class="">
                            <img class="avatar-40 rounded" src="images/user/05.jpg" alt="" />
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Lorem Ipsum generators</h6>
                            <small class="float-left font-size-12">5 Dec</small>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="navbar-list">
              <li>
                <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center">
                  <i class="ri-arrow-down-s-fill"></i>
                </a>
                <div class="iq-sub-dropdown iq-user-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0 ">
                      <div class="bg-primary p-3 line-height">
                        <h5 class="mb-0 text-white line-height">Hello Bni Cyst</h5>
                        <span class="text-white font-size-12">Available</span>
                      </div>
                    
                      <Link to={"/UpdateUser"} class="iq-sub-card iq-bg-warning-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-warning">
                            <i class="ri-profile-line"></i>
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Edit Profile</h6>
                            <p class="mb-0 font-size-12">Modify your personal details.</p>
                          </div>
                        </div>
                      </Link>
                      <a href="account-setting.html" class="iq-sub-card iq-bg-info-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-info">
                            <i class="ri-account-box-line"></i>
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Account settings</h6>
                            <p class="mb-0 font-size-12">Manage your account parameters.</p>
                          </div>
                        </div>
                      </a>
                      <a href="privacy-setting.html" class="iq-sub-card iq-bg-danger-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-danger">
                            <i class="ri-lock-line"></i>
                          </div>
                          <div class="media-body ml-3">
                            <h6 class="mb-0 ">Privacy Settings</h6>
                            <p class="mb-0 font-size-12">Control your privacy parameters.</p>
                          </div>
                        </div>
                      </a>
                      <div class="d-inline-block w-100 text-center p-3">
                        <Link to="/" class="bg-primary iq-sign-btn" role="button" onClick={logout}>
                          Log out<i class="ri-login-box-line ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbarback;

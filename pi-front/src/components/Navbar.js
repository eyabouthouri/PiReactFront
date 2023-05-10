import React, { useEffect, lazy, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../redux/session";
import { FaComment } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa";

import "./navbarr.css";
function Navbar(props) {
  const dispatch = useDispatch();

  const { isLoggedIn, isAdmin, isUser, isCoach,userexisting } = useSelector((state) => state.session);
 
  const [userconnecte, setUserconnecte] = useState(userexisting);

  const [input, setinput] = useState([]);

  var history = useNavigate();
  useEffect(() => {
    
     // setUserconnecte(userexisting);
    
  }, []);
  useEffect(() => {
    setinput({
      name: userconnecte?.name,
      lastname: userconnecte?.lastname,
      email: userconnecte?.email,
      image: userconnecte?.image,
    });
  }, []);
  const userconnectee = async () => {
    const res = await axios
      .get("/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    return res.data;
  };
  const logout = async () => {
    const res = await axios
      .get("/users/logout", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    dispatch(setIsLoggedin());
    setUserconnecte(false);
    //history("/Signin");
  };

  const updateadmin = async () => {
    try {
      const resupdate = await axios.post(
        `/users/updateuser/${userconnecte?._id}`,
        {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          image: input.image,
        },
        { withCredentials: true }
      );
      history("/home");
    } catch (err) {
      console.error(err);
    }
  };
  const Handelsubmit = (ee) => {
    ee.preventDefault();
    updateadmin().then(() => {
      history("/home");
    });
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  return (
    <div>
      <header id="header" class="fixed-top header-inner-pages">
        <div class="container d-flex align-items-center">
          <nav id="navbar" class="navbar">
            <ul>
              <Link to="/home">
                <img src="/images/yc.png" height="70" width="70" class="navbar-light" alt="Tiya Golf Club" />
              </Link>
              <li class="nav-item scrollto active">
                <Link class="" to="/Library">
                  Libraries
                </Link>
              </li>
              <li class="nav-item scrollto active">
                <Link class="" to="/allevent">
                  Events
                </Link>
              </li>
              <li class="nav-item scrollto active">
                <Link class="nav-link" to="/Course">
                  Courses
                </Link>
              </li>
              <li class="nav-item scrollto active">
                <Link class="nav-link" to="/getallcoach">
                  MentalHealth
                </Link>
              </li>
              <li class="nav-item scrollto active"></li>
              <li class="nav-item scrollto active">
                {!isLoggedIn && (
                  <Link class="nav-link scrollto active " to="/Signin">
                    Sign in
                  </Link>
                )}
              </li>
              <li class="nav-item scrollto active">
                {isLoggedIn && isAdmin && (
                  <Link class="nav-link scrollto active " to="/ShowCoach">
                    Dashboard
                  </Link>
                )}
              </li>
              <li class="nav-item scrollto active">
                {isLoggedIn && isCoach && (
                  <Link class="nav-link  " to="/getrdv">
                    appoitment
                  </Link>
                )}
              </li>
              <li class="scrollto active">
                {isLoggedIn && isUser && (
                  <Link class="nav-link  " to="/getrdvpatient">
                    appoitment
                  </Link>
                )}
              </li>
              <li class="scrollto active">
                {isLoggedIn && (
                  <Link class="nav-link  " data-toggle="modal" data-target="#exampleModal" style={{ color: "#00BFFF" }}>
                    Profile
                  </Link>
                )}
              </li>
              &nbsp;
              <li class="scrollto active">{isLoggedIn && <img class="profile-pic" src={userconnecte?.image} alt="profile-pic" height="40" width="40" />}</li>
              &nbsp;
              <li class="scrollto active">
                {isLoggedIn && (
                  <h6 class="text-white">
                 {userconnecte?.name} 
                </h6>
                  
                )}
              </li>
              <li class="scrollto active">
                {isLoggedIn && (
                  <a href="/chat">
                    <FaFacebookMessenger style={{ color: "#00BFFF" }} size={30} />
                  </a>
                )}
              </li>
              <li class="scrollto active">
                {isLoggedIn && (
                  <Link class="nav-link  " style={{ color: "#00BFFF" }} onClick={logout} to="/">
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Profile
              </h5>

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={Handelsubmit}>
                <div class="form-group row align-items-center">
                  <div class="col-md-12">
                    <div class="profile-img-edit">
                      <img class="profile-pic" src={userconnecte?.image} alt="profile-pic" style={{ width: 150, height: 150 }} />
                      <div class="p-image">
                        <i></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-6">
                  <label for="fname">First Name:{input.name}</label>
                  <input type="text" class="form-control" name="name" value={input.name} onChange={handleInputChange} />
                </div>
                <div class="form-group col-sm-6">
                  <label for="lname">Last Name:</label>
                  <input type="text" class="form-control" name="lastname" value={input.lastname} onChange={handleInputChange} />
                </div>
                <div class="form-group col-sm-6">
                  <label for="uname">email:</label>
                  <input type="text" class="form-control" name="email" value={input.email} onChange={handleInputChange} />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

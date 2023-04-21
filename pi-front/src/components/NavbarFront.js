import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../redux/session";
function NavbarFront(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin, isUser } = useSelector((state) => state.session);
  const [userconnecte, setUserconnecte] = useState([]);
  
  const [input, setinput] = useState(
    []
  );
  var history = useNavigate;
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
    });
  }, []);
  useEffect(()=>{
    setinput(
      {
        name:userconnecte.name,
        lastname:userconnecte.lastname,
        email:userconnecte.email,
        image:userconnecte.image,
        
      }
    )
  },[userconnecte])
  const userconnectee = async () => {
    const res = await axios
      .get("http://localhost:5000/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    if (res.data == []) {
      history("/Signin");
    }
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
    history("/Signin");
  };
  const updateadmin = async () => {
    const resupdate = await axios

      .post(
        `http://localhost:5000/users/updateuser/${userconnecte._id}`,
        {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          image: input.image,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.error(err);
      });
    history("/home");
    return resupdate.data;
  };
  const Handelsubmit = (ee) => {
    ee.preventDefault();
    updateadmin()
  };
  const handleInputChange = (e) =>{
    let {name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center">
            <img src="/images/logo.png" class=" navbar-light " height="30" width="50" alt="Tiya Golf Club" />
          </a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item active">
                <a class="nav-link" href="profile-images.html">
                  Library <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="profile-event.html">
                  Event
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="profile-video.html">
                  course
                </a>
              </li>
              <li class="nav-item ml-auto">
                {isLoggedIn && (
                  <Link class="nav-link " to="/getallcoach">
                    coach
                  </Link>
                )}
              </li>
              <li class="nav-item ml-auto">
                {!isLoggedIn && (
                  <Link class="nav-link " to="/">
                    sign in
                  </Link>
                )}
              </li>
              <li class="nav-item ml-auto">
                {isLoggedIn && isAdmin && (
                  <Link class="nav-link " to="/ShowCoach">
                    Dashboard
                  </Link>
                )}
              </li>
              <li class="nav-item ml-auto">
               
              </li>
            </ul>
          </div>
          {isLoggedIn && (
            <>
            &nbsp; <img class="profile-pic" src={process.env.PUBLIC_URL + "/imagee/" + userconnecte.image} alt="profile-pic"  height="70" width="50" />
              <h6>
                {" "}
              &nbsp; {userconnecte.name} &nbsp;{userconnecte.lastname} 
             
              </h6>
              &nbsp; &nbsp; &nbsp;
              <Link class="nav-link " onClick={logout} to="/">
                logout
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link class="nav-link " data-toggle="modal" data-target="#exampleModal">updateprofile</Link>
            </>
          )}
           {isLoggedIn && isUser && (
                  <Link class="nav-link " to="/getrdvpatient">
                    mes rendezvous
                  </Link>
                )}
        </div>
        <div>
       
        </div>
      </nav>

    
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
        
       

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <form onSubmit={Handelsubmit}>
       <div class="form-group row align-items-center">
                          <div class="col-md-12">
                            <div class="profile-img-edit">
                              <img class="profile-pic" src={process.env.PUBLIC_URL + "/imagee/" + userconnecte.image} alt="profile-pic" />
                              <div class="p-image">
                                <i></i>
                                
                              </div>
                            </div>
                          </div>
                        </div>
       <div class="form-group col-sm-6">
           <label for="fname">First Name:{input.name}</label>
           <input type="text" class="form-control" name="name" value={input.name} onChange={handleInputChange}  />
          </div>
      <div class="form-group col-sm-6">
     <label for="lname">Last Name:</label>
     <input type="text" class="form-control" name="lastname" value={input.lastname} onChange={handleInputChange}  />
    </div>
    <div class="form-group col-sm-6">
        <label for="uname">email:</label>
   <input type="text" class="form-control" name="email" value={input.email} onChange={handleInputChange}  />
     </div>
     <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>             
       </form>
      </div>
     
    </div>
  </div>
</div>

      

      
    </div>
  );
}

export default NavbarFront;

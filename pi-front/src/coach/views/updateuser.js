import React, { useEffect, useState } from "react";
import Fildest from "../../components/Fildest";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import StepDeux from "../../components/StepDeux";
import axios from "axios";
import { NavLink, useNavigate, Link } from "react-router-dom";
import ShowCoach from "./ShowCoach";
axios.defaults.withCredentials = true;
function UpdateUser() {
  const [userconnecte, setUserconnecte] = useState([]);
  const initialState = { name: "", lastname: "", email: "", pwd: "", image: "" };

  const [input, setinput] = useState([]);
  const [inputt, setinputt] = useState([]);
  const [msg, setmsg] = useState("");
  const [valid, setValid] = useState(true);

  var history = useNavigate();

  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
    });
  }, []);
  useEffect(() => {
    setinput({
      name: userconnecte.name,
      lastname: userconnecte.lastname,
      email: userconnecte.email,
      image: userconnecte.image,
    });
  }, [userconnecte]);

  const userconnectee = async () => {
    const res = await axios
      .get("/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);

    return res.data;
  };

  const updateadmin = async () => {
    const resupdate = await axios

      .post(
        `/users/updateuser/${userconnecte._id}`,
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
    history("/ShowCoach");
    return resupdate.data;
  };
  const updatepwd = async () => {
    try {
      const resupdate = await axios.post(
        `/users/changerpwd/${userconnecte.username}`,
        {
          pwd: inputt.pwd,
          pwdd: inputt.pwdd,
        },
        { withCredentials: true }
      );
      history("/ShowCoach");
    } catch (err) {
      setValid(false);
      console.error(err.response.data.message);
      setmsg(err.response.data.message);
    }
  };
  const Handelsubmit = (ee) => {
    ee.preventDefault();
    updateadmin().then((ress, err) => {
      if (err) {
        console.error(err);
      }

      console.log(ress.data);
    });
  };
  const Handelsubmitt = (ee) => {
    ee.preventDefault();
    updatepwd();
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const handleChange = (a) => {
    let { name, value } = a.target;
    setinputt({ ...inputt, [name]: value });
  };

  return (
    <div id="content-page" class="content-page">
      <div>
        <Navbarback />
        <div>
          <SideBar />
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="iq-card">
              <div class="iq-card-body p-0">
                <div class="iq-edit-list">
                  <ul class="iq-edit-profile d-flex nav nav-pills">
                    <li class="col-md-3 p-0">
                      <a class="nav-link active" data-toggle="pill" href="#personal-information">
                        Personal Information
                      </a>
                    </li>
                    <li class="col-md-3 p-0">
                      <a class="nav-link" data-toggle="pill" href="#chang-pwd">
                        Change Password
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="iq-edit-list-data">
              <div class="tab-content">
                <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">Personal Information</h4>
                      </div>
                    </div>
                    <div class="iq-card-body">
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
                        <div class=" row align-items-center">
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
                        </div>

                        <button type="submit" class="btn btn-primary mr-2">
                          <Link to="/ShowCoach"></Link>update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="chang-pwd" role="tabpanel">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">Change Password</h4>
                      </div>
                    </div>
                    <div class="iq-card-body">
                      <form onSubmit={Handelsubmitt}>
                        <div class="form-group">
                          <label for="cpass">Current Password:</label>
                          <Link to="/forgotpassword" class="float-right">
                            Forgot Password
                          </Link>

                          <input type="text" class="form-control" name="pwd" value={inputt.pwd} onChange={handleChange}></input>
                          {!valid && <span style={{ color: "red" }}>{msg}!! </span>}
                        </div>
                        <div class="form-group">
                          <label for="npass">New Password:</label>
                          <input type="text" class="form-control" name="pwdd" value={input.pwdd} onChange={handleChange}></input>
                        </div>

                        <button type="submit" class="btn btn-primary mr-2">
                          Submit
                        </button>
                        <button type="reset" class="btn iq-bg-danger">
                          Cancle
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;

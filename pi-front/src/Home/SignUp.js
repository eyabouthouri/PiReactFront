import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSpring, animated } from "react-spring";
import Terms from "./Terms";
import axios from "axios";
import { useFormik } from "formik";
import { BasicSchema } from "../shemas/controle";
import { Store } from "react-notifications-component";

axios.defaults.withCredentials = true;
function SignUp() {
  const initialState = { name: "", lastname: "", email: "", username: "", pwd: "", image: "" };

  const [input, setinput] = useState(initialState);
  const [msg, setmsg] = useState({});
  const [valid, setValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const history = useNavigate();
  const addclient = async () => {
    try {
      const res = await axios.post(
        "/users/add/user",
        {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          username: input.username,
          pwd: input.pwd,
          image: input.image,
        },
        { withCredentials: true }
      );
      history("/");
    } catch (err) {
      setValid(false);
      console.error(err.response.data);
      setmsg(err.response.data);
    }
  };
  const TermsAndConditions = () => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowButton(!showButton);
  };

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: showButton ? 1 : 0 },
  });


  const handelsubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      console.log("Form data submitted successfully!");
      addclient();
    } else {
      Store.addNotification({
        title: "Terms And Conditions",
        message: "Please read and accept our terms and conditions to sign up",
        type: "danger",
        insert: "center",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  return (
    <div class="sign-in-page">
      <div id="container-inside">
        <div id="circle-small"></div>
        <div id="circle-medium"></div>
        <div id="circle-large"></div>
        <div id="circle-xlarge"></div>
        <div id="circle-xxlarge"></div>
      </div>
      <div class="container p-0">
        <div class="row no-gutters">
          <div class="col-md-6 text-center pt-5">
            <div class="sign-in-detail text-white">
              <a class="sign-in-logo mb-5" href="#">
                <img src="images/yc.png" class="img-fluid" alt="logo" style={{ width: 500, height: 300 }} />
              </a>
              <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                <div class="item">
                  <img src="images/login/1.png" class="img-fluid mb-4" alt="logo" />
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </div>
                <div class="item">
                  <img src="images/login/1.png" class="img-fluid mb-4" alt="logo" />
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </div>
                <div class="item">
                  <img src="images/login/1.png" class="img-fluid mb-4" alt="logo" />
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 bg-white pt-5">
            <div class="myBox">
              <div class="sign-in-from">
                <h1 class="mb-0">Sign Up</h1>

                <form onSubmit={handelsubmit}>
                  <div class="form-group">
                    <label htmlFor="name" for="exampleInputEmail1">
                      First Name
                    </label>
                    <input type="text" class="form-control mb-0" name="name" onChange={handleChange} value={input.name} placeholder="first name" />
                    {!valid && msg.name && <span style={{ color: "red" }}>{msg.name}!! </span>}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Last Name</label>

                    <input type="text" class="form-control mb-0" name="lastname" onChange={handleChange} value={input.lastname} placeholder="last name" />
                    {!valid && msg.lastname && <span style={{ color: "red" }}>{msg.lastname}!! </span>}
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail2">Email address</label>
                    <input type="text" class="form-control mb-0" name="email" onChange={handleChange} value={input.email} placeholder="info@example.com"></input>
                    {!valid && msg.email && <span style={{ color: "red" }}>{msg.email}!! </span>}
                  </div>

                  <div class="form-group">
                    <label for="exampleInputEmail2">Username</label>
                    <input type="text" name="username" onChange={handleChange} value={input.username} placeholder="username" class="form-control mb-0" />
                    {!valid && (msg.message || msg.username) && <span style={{ color: "red" }}>{msg.username || msg.message}!! </span>}
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Password </label>
                    <input type="text" class="form-control mb-0" name="pwd" onChange={handleChange} value={input.pwd} placeholder="******" />
                    {!valid && msg.pwd && <span style={{ color: "red" }}>{msg.pwd}!! </span>}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Image </label>
                    <input type="file" class="form-control mb-0" name="image" onChange={handleChange} value={input.image} />
                  </div>
                  <div class="d-inline-block w-100">
                    <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                      <input type="checkbox" class="custom-control-input" id="customCheck1" />
                      <span>Please read our terms and conditions before using our website.</span>
                      <br></br>
                      <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        <a> &nbsp; I agree to the terms and conditions.</a>
                      </label>
                      {isChecked && <Terms />}
                    </div>

                    <button type="submit" class="btn btn-primary float-right">
                      Sign Up
                    </button>
                  </div>
                  <div class="sign-info">
                    <span class="dark-color d-inline-block line-height-2">
                      Already Have Account ? <NavLink to="/Signin">Sign In</NavLink>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

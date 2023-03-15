import React, { useState } from "react";
import axios from "axios";

import { useNavigate, Link, NavLink } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setIsLoggedin } from "../redux/session";

axios.defaults.withCredentials = true;
function SignIn(props) {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");
  const [valid, setValid] = useState(true);
  const [inputt, setinput] = useState({
    username: "",
    password: "",
  });
  var role = "admin";
  var history = useNavigate();
  function handleInputChange(event) {
    setinput({ ...inputt, username: event.target.value });
  }
  function handleInputChange2(e) {
    setinput({ ...inputt, password: e.target.value });
  }

  const [rememberMe, setRememberMe] = useState(false);
  const [lastLoggedInUser, setLastLoggedInUser] = useState("");

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const sendrequest = async () => {
    const res = await axios
      .post(
        "/users/login",
        {
          username: inputt.username,
          pwd: inputt.password,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        setValid(false);
        console.error(err.response.data.message);
        setmsg(err.response.data.message);
      });

    const data = res.data;
    dispatch(setIsLoggedin({token: data.token, isAdmin:data.userexisting?.role=="admin"}));
    console.log(data);
    return data;
  };

  const Handelsubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("lastLoggedInUser", inputt.username);
    } else {
      localStorage.removeItem("lastLoggedInUser");
    }
    sendrequest().then((ress) => {
      // props.setIsLoggedIn(true);
      // console.log(ress.userexisting);
      if (ress.userexisting.role == "user") {
        history("/home");
      } else if (ress.userexisting.role == "admin") {
        history("/ShowCoach");
      }
    });
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  React.useEffect(() => {
    const lastUser = localStorage.getItem("lastLoggedInUser");
    if (lastUser) {
      setLastLoggedInUser(lastUser);
      setUsername(lastUser);
    }
  }, []);

  const responseSuccessGoogle = async (response) => {
    try {
      const { data } = await axios.post("/users/googlelogin", {
        token: response.credential,
      });
      dispatch(setIsLoggedin({token : data.token, isAdmin: false}));
      history("/home");
    } catch (err) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const responseErrorGoogle = async (response) => {};

  return (
    <div>
      {lastLoggedInUser && <div>last user, {lastLoggedInUser}!</div>}
      <div>
        <section class="sign-in-page">
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
                      <h4 class="mb-1 text-white">Find new friends</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </div>
                    <div class="item">
                      <img src="images/login/2.png" class="img-fluid mb-4" alt="logo" />
                      <h4 class="mb-1 text-white">Connect with the world</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </div>
                    <div class="item">
                      <img src="images/login/3.png" class="img-fluid mb-4" alt="logo" />
                      <h4 class="mb-1 text-white">Create new events</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 bg-white pt-5">
                <div className="sign-in-from">
                  <h1 className="mb-0 ">Sign in</h1>
                  <p>Enter your username and password to sign-in.</p>
                  <form className="mt-4" onSubmit={Handelsubmit}>
                    {!valid && <span style={{ color: "red" }}>{msg}!! </span>}
                    <div className="form-group">
                      <label for="exampleInputEmail1">Username</label>
                      <input type="text" placeholder={lastLoggedInUser} className="form-control form-control-lg" value={inputt.username} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <Link to="/forgotpassword" class=" iq-sign-btn float-right ">
                        Forgot Password?
                      </Link>
                      <input type="password" value={inputt.password} onChange={handleInputChange2} name="password" id="form3Example4" class="form-control form-control-lg"></input>
                    </div>
                    <div className="d-inline-block w-100">
                      <div>
                        <label htmlFor="remember-me">
                          <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
                          Remember me
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary float-right">
                        Sign in
                      </button>
                    </div>
                    <br></br>
                    <br></br>
                    <ul className="iq-social-media">
                      <li>
                        <i className="ri-google-box-line"></i>
                        <GoogleOAuthProvider clientId="89869161971-9i90tpaak744qss86o926bg663jctuie.apps.googleusercontent.com">
                          <GoogleLogin locale="en" text="signin with google" onSuccess={responseSuccessGoogle} onError={responseErrorGoogle} auto_select={false} useOneTap={false} style={{ zIndex: 50 }} />
                        </GoogleOAuthProvider>
                      </li>
                    </ul>
                    <br></br>
                    <div className="sign-info">
                      <span className="dark-color d-inline-block ">
                        Don't have an account? <NavLink to="/SignUp">Sign up</NavLink>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <script src="js/jquery.min.js" />
        <script src="js/popper.min.js" />
        <script src="js/bootstrap.min.js" />
        <script src="js/jquery.appear.js" />
        <script src="js/countdown.min.js" />
        <script src="js/waypoints.min.js" />
        <script src="js/jquery.counterup.min.js" />
        <script src="js/wow.min.js" />
        <script src="js/apexcharts.js" />
        <script src="js/lottie.js" />
        <script src="js/slick.min.js" />
        <script src="js/select2.min.js" />
        <script src="js/owl.carousel.min.js" />
        <script src="js/jquery.magnific-popup.min.js" />
        <script src="js/smooth-scrollbar.js" />
        <script src="js/chart-custom.js" />
        <script src="js/custom.js" />
      </div>
    </div>
  );
}

export default SignIn;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../redux/session";
function Navbar(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
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
              <li class="nav-item">
                <a class="nav-link " href="friend-list.html">
                  coach
                </a>
              </li>
              <li class="nav-item ml-auto">
                {!isLoggedIn && (
                  <Link class="nav-link " to="/">
                    sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
          {isLoggedIn && (
            <>
              <h6>
                {" "}
                bienvenu &nbsp; {userconnecte.name} &nbsp;{userconnecte.lastname}
              </h6>
              &nbsp; &nbsp; &nbsp;
              <Link class="nav-link " onClick={logout} to="/">
                logout
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link class="nav-link " to="/">
                updateprofile
              </Link>
            </>
          )}
        </div>
      </nav>

      <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="section-overlay"></div>

        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-12 mb-5 mb-lg-0">
              <h2 class="text-white">Welcome to Our web Sprints</h2>

              <h1 class="cd-headline rotate-1 text-white mb-4 pb-2">
                <span>Tiya is</span>
                <span class="cd-words-wrapper">
                  <b class="is-visible">Modern</b>
                  <b>Creative</b>
                  <b>Lifestyle</b>
                </span>
              </h1>

              <div class="custom-btn-group">
                <a href="#section_2" class="btn custom-btn smoothscroll me-3">
                  Our Story
                </a>

                <a href="#section_3" class="link smoothscroll">
                  Become a member
                </a>
              </div>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section class="about-section section-padding" id="section_2">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-12 text-center">
              <h2 class="mb-lg-5 mb-4">About Tiya</h2>
            </div>

            <div class="col-lg-5 col-12 me-auto mb-4 mb-lg-0">
              <h3 class="mb-3">Tiya Club History</h3>

              <p>
                <strong>Since 1984</strong>, Tiya is ranked #8 in the top 10 golf courses in the world. Tiya is Bootstrap 5 HTML CSS template for golf clubs. Anyone can modify and use this layout for commercial purposes.
              </p>

              <p>Tiya Golf Club is 100% free CSS template provided by TemplateMo website. Please tell your friends about our website. Thank you for visiting.</p>
            </div>

            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
              <div class="member-block">
                <div class="member-block-image-wrap">
                  <img src="images/members/portrait-young-handsome-businessman-wearing-suit-standing-with-crossed-arms-with-isolated-studio-white-background.jpg" class="member-block-image img-fluid" alt="" />

                  <ul class="social-icon">
                    <li class="social-icon-item">
                      <a href="#" class="social-icon-link bi-twitter"></a>
                    </li>

                    <li class="social-icon-item">
                      <a href="#" class="social-icon-link bi-whatsapp"></a>
                    </li>
                  </ul>
                </div>

                <div class="member-block-info d-flex align-items-center">
                  <h4>Michael</h4>

                  <p class="ms-auto">Founder</p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-12">
              <div class="member-block">
                <div class="member-block-image-wrap">
                  <img src="images/members/successful-asian-lady-boss-red-blazer-holding-clipboard-with-documens-pen-working-looking-happy-white-background.jpg" class="member-block-image img-fluid" alt="" />

                  <ul class="social-icon">
                    <li class="social-icon-item">
                      <a href="#" class="social-icon-link bi-linkedin"></a>
                    </li>
                    <li class="social-icon-item">
                      <a href="#" class="social-icon-link bi-twitter"></a>
                    </li>
                  </ul>
                </div>

                <div class="member-block-info d-flex align-items-center">
                  <h4>Sandy</h4>

                  <p class="ms-auto">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div class="section-bg-image-block">
              <h2 class="mb-lg-3">Get our newsletter</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore.</p>

              <form action="#" method="get" class="custom-form mt-lg-4 mt-2" role="form">
                <div class="input-group input-group-lg">
                  <span class="input-group-text bi-envelope" id="basic-addon1"></span>

                  <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required="" />

                  <button type="submit" class="form-control">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-12 me-auto mb-5 mb-lg-0">
              <a class="navbar-brand d-flex align-items-center" href="index.html">
                <img src="images/logo.png" class="navbar-brand-image img-fluid" alt="" />
                <span class="navbar-brand-text">
                  Tiya
                  <small>Golf Club</small>
                </span>
              </a>
            </div>

            <div class="col-lg-3 col-12">
              <h5 class="site-footer-title mb-4">Join Us</h5>

              <p class="d-flex border-bottom pb-3 mb-3 me-lg-3">
                <span>Mon-Fri</span>
                6:00 AM - 6:00 PM
              </p>

              <p class="d-flex me-lg-3">
                <span>Sat-Sun</span>
                6:30 AM - 8:30 PM
              </p>

              <p class="copyright-text">Copyright © 2048 Tiya Golf Club</p>
            </div>

            <div class="col-lg-2 col-12 ms-auto">
              <ul class="social-icon mt-lg-5 mt-3 mb-4">
                <li class="social-icon-item">
                  <a href="#" class="social-icon-link bi-instagram"></a>
                </li>

                <li class="social-icon-item">
                  <a href="#" class="social-icon-link bi-twitter"></a>
                </li>

                <li class="social-icon-item">
                  <a href="#" class="social-icon-link bi-whatsapp"></a>
                </li>
              </ul>
              <p class="copyright-text">
                Design:{" "}
                <a rel="nofollow" href="https://templatemo.com" target="_blank">
                  TemplateMo
                </a>
              </p>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#81B29A"
            fill-opacity="1"
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </footer>
    </div>
  );
}

export default Navbar;

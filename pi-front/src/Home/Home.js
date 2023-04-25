import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../redux/session";
import NewsLetter from "../event/views/NewsLetter"

import Navbar from "../components/Navbar";

function Home(props) {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.session);
  const [userconnecte, setUserconnecte] = useState([]);

  const [input, setinput] = useState([]);
  var history = useNavigate();
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
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
    try {
      const resupdate = await axios.post(
        `http://localhost:5000/users/updateuser/${userconnecte._id}`,
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
    updateadmin();
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const refreshtoken = async () => {
    const res = await axios
      .get("http://localhost:5000/users/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    {
      let interval = setInterval(() => {
        refreshtoken();
      }, 1000 * 60 * 60);
    }
  }, []);
  return (
    <div>
  <body id="page-top">
               <Navbar/>
       
  <img src="images/ab.jpg"  height="750px"  width="1550px" alt="image description" />


        <section class="page-section bg-light" id="portfolio">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Our WebSite</h2>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                                <div class="portfolio-hover">
                                </div>
                                <Link class="nav-link" to="/Library">
                                <img class="img-fluid" src="images/ook.jpg"  /> </Link>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">Library</div>
                                <div class="portfolio-caption-subheading text-muted">abonnez et comentez vous ...!</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-4">
                          <div class="portfolio-item">
                          <Link class="nav-link" to="/Course">

                                <img class="img-fluid" src="images/time.jpg" alt="..." /></Link>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">Course</div>
                                <div class="portfolio-caption-subheading text-muted">participer</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                        <Link class="nav-link" to="/allevent">
                                <img class="img-fluid" src="images/r8.jpg" alt="..." /> </Link>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">Event</div>
                                <div class="portfolio-caption-subheading text-muted">participer!</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                        <div class="portfolio-item">
                        <Link class="nav-link" to="/getallcoach">

                                <img class="img-fluid" src="images/oojpg.jpg"   alt="..." /> </Link>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">Mentale Health </div>
                                <div class="portfolio-caption-subheading text-muted"> rendez_vous </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
                        <div class="portfolio-item">
                               
                                <img class="img-fluid" src="images/map.jpg" alt="..." />
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">Map</div>
                                <div class="portfolio-caption-subheading text-muted">destination ...</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="portfolio-item">
                        <Link class="nav-link " to="/getrdv">

                                <img class="img-fluid" src="images/cal.png" alt="..." /> </Link>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">appoitment</div>
                                <div class="portfolio-caption-subheading text-muted">Photography</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="page-section bg-light" id="team">
  <div class="container">
    <div class="text-center">
      <h2 class="section-heading text-uppercase">Our Amazing Team</h2>
    </div>
    <div class="row my-5">
      <div class="col-lg-3 col-md-6">
        <div class="team-member">
          <img class="mx-auto rounded-circle" src="images/eya.jpg"  height="300px" width="200px"alt="..." />
          <h4>Eya bouthouri</h4>
          <p class="text-muted">Lead Designer</p>
          <div class="social-icons">
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Twitter Profile"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Facebook Profile"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="team-member">
          <img class="mx-auto rounded-circle" src="images/dorsaf.jpg"   height="300px" width="200px"alt="..." />
          <h4>dorsaf  charfeddine</h4>
          <p class="text-muted">Lead Marketer</p>
          <div class="social-icons">
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Twitter Profile"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Facebook Profile"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="team-member">
          <img class="mx-auto rounded-circle" src="images/ella.jpg"  height="300px" width="200px" alt="..." />
          <h4>Ella boulifi</h4>
          <p class="text-muted">Lead Marketer</p>
          <div class="social-icons">
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Twitter Profile"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Facebook Profile"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>


      <div class="col-lg-3 col-md-6">
        <div class="team-member">
          <img class="mx-auto rounded-circle" src="images/maryem.jpg"   height="300px" width="200px"alt="..." />
          <h4>marriem benkhlifa </h4>
          <p class="text-muted">Lead Developer</p>
          <div class="social-icons">
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Twitter Profile"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Facebook Profile"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker LinkedIn Profile"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      </div></div></section>
        <div class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/microsoft.svg" alt="..." aria-label="Microsoft Logo" /></a>
                    </div>
                    <div class="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/google.svg" alt="..." aria-label="Google Logo" /></a>
                    </div>
                    <div class="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/facebook.svg" alt="..." aria-label="Facebook Logo" /></a>
                    </div>
                    <div class="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="assets/img/logos/ibm.svg" alt="..." aria-label="IBM Logo" /></a>
                    </div>
                </div>
            </div>
        </div>

        <section class="page-section" id="contact">
        <NewsLetter/>

        </section>
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright &copy; Your Website 2023</div>
                    <div class="col-lg-4 my-3 my-lg-0">
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <a class="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                        <a class="link-dark text-decoration-none" href="#!">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    
      </body>
    </div>
  );
}

export default Home;

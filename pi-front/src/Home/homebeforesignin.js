import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllEvents from "../event/views/AllEvents";
import ClientCourse from "../course/views/ClientCourse";
import Library from "../Library/views/Library";
import NewsLetter from "../event/views/NewsLetter";
import Footer from "../components/Footer";
import Lib from "../Library/lib";
import { blue } from "@material-ui/core/colors";
function Homebeforsignin(props) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getcoachs().then((d) => {
      setUser(d);
    });
  }, []);
  console.log(user);
  const getcoachs = async (id) => {
    const coach = await axios.get(`http://localhost:5000/coach/topcoach`, {
      withCredentials: true,
    });

    return coach.data;
  };

  return (
    <div>
      <Navbar></Navbar>

      <section id="hero">
        <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
          <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active" style={{ backgroundImage: "url(home/assets/img/slide/R.jpg)" }}>
              <div class="carousel-container">
                <div class="container">
                  <h2 class="animated fadeInDown">
                    Welcome to <span>YouthConnect </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="cta" class="cta">
          <div class="container">
            <div class="text-center">
              <div class="row" />

              <div class="col-sm-12">
                <div class="col-sm-12">
                  <div class=" bg-transparent" style={{ opacity: 0.8 }}>
                    <h1 class="mt-4 mb-1 text-white">Participate and enjoy events </h1>
                    <h4 class="mt-4 mb-1 text-white">Check best and latest events, enjoy new experiences </h4>
                    <br></br>
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title"></div>

                      <div class="col-md-4">
                        <Link class="btn btn-info " style={{ backgroundColor: "#427dcf" }} to="/allevent">
                          Go to Events
                        </Link>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" class="cta">
          <div class="container">
            <div class="text-center">
              <div class="row" />

              <div class="col-sm-12">
                <div class="col-sm-12">
                  <div class=" bg-transparent" style={{ opacity: 0.8 }}>
                    <h1 class="mt-4 mb-1 text-white">Enjoy Hobby Classes </h1>
                    <h4 class="mt-4 mb-1 text-white">Learn and enjoy the best classes in our website </h4>
                    <br></br>
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title"></div>

                      <div class="col-md-4">
                        <Link class="btn btn-info " style={{ backgroundColor: "#427dcf" }} to="/Course">
                          Go to courses
                        </Link>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" class="cta">
          <div class="container">
            <div class="text-center">
              <div class="row" />

              <div class="col-sm-12">
                <div class="col-sm-12">
                  <div class=" bg-transparent" style={{ opacity: 0.8 }}>
                    <h1 class="mt-4 mb-1 text-white">Check and Find Libraries </h1>
                    <h4 class="mt-4 mb-1 text-white">Find libraries where you can study </h4>
                    <br></br>
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title"></div>

                      <div class="col-md-4">
                        <Link class="btn btn-info " style={{ backgroundColor: "#427dcf" }} to="/Library">
                          Go to Libraries
                        </Link>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section id="testimonials" class="testimonials section-bg">
          <div class="container-fluid">
            <div class="section-title">
              <h2>Library</h2>
              <h3>
                Check our <span>Library</span>
              </h3>
            </div>

            <Lib></Lib>

            <br></br>
          </div>
        </section> */}

        <section id="team" class="cta">
          <div className="team">
            <div class="container-fluid">
              <div class="section-title">
                <h3>
                  top 4 <span>coach</span>
                </h3>
                <Link class="btn btn-info " style={{ backgroundColor: "#427dcf" }} to="/getallcoach">
                  Check all coaches
                </Link>
              </div>

              <div class="row justify-content-center">
                <div class="col-xl-10">
                  <div class="row">
                    {user &&
                      user.map((item, index) => {
                        return (
                          <div class="col-xl-3 col-lg-4 col-md-6">
                            <div class="member">
                              <img src={item.image} width={300} class="img-fluid" alt="image2" />

                              <div class="member-info">
                                <div class="member-info-content">
                                  <h4>{item.name}</h4>
                                  <span>{item.specialite}</span>
                                </div>
                                <div class="social">
                                  <a href="">
                                    <i class="bi bi-twitter"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-facebook"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-instagram"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-linkedin"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" class="cta">
          <div class="container">
            <div class="text-center">
              <NewsLetter></NewsLetter>
            </div>
          </div>
        </section>

        <section id="contact" class="cta">
          <div class="container-fluid">
            <div class="section-title">
              <h3>
                Get In Touch With <span>Us</span>
              </h3>
            </div>

            <div class="row justify-content-center">
              <div class="col-xl-6">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row justify-content-center">
                      <div class="col-md-6 info d-flex flex-column align-items-stretch">
                        <i class="bx bx-map"></i>
                        <h4 style={{ color: "#427dcf" }}>Address</h4>
                        <p>Ariana, Tunisia</p>
                      </div>
                      <div class="col-md-6 info d-flex flex-column align-items-stretch">
                        <i class="bx bx-phone"></i>
                        <h4 style={{ color: "#427dcf" }}>Call Us</h4>
                        <p>
                          +1 5589 55488 55
                          <br />
                          +1 5589 22548 64
                        </p>
                      </div>
                      <div class="col-md-6 info d-flex flex-column align-items-stretch">
                        <i class="bx bx-envelope"></i>
                        <h4 style={{ color: "#427dcf" }}>Email Us</h4>
                        <p>youthconnect@gmail.com</p>
                      </div>
                      <div class="col-md-6 info d-flex flex-column align-items-stretch">
                        <i class="bx bx-time-five"></i>
                        <h4 style={{ color: "#427dcf" }}>Working Hours</h4>
                        <p>
                          Mon - Fri: 9AM to 5PM
                          <br />
                          Sunday: 9AM to 1PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Homebeforsignin;
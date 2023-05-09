import { NavLink } from "react-router-dom";
import Topnav from "../../components/Topnav";
import { toast } from "react-toastify";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
const alanKey = "d13ff5f9f607b814c3e0b740da4299d42e956eca572e1d8b807a3e2338fdd0dc/stage";

function AllEvents(props) {
  const currentUrl = window.location.href;
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: (commandData) => {
        if (commandData.command === "navigateTo" && commandData.page === "http://localhost:3001/home") {
          // Navigate to the home page
          window.location.href = "http://localhost:3001/home";
        }
      },
    });
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    listev();
  }, []);
  const timeOut = useRef(0);
  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listev();
        } else {
          const response = await axios.get(`http://localhost:5000/events/rech/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 100);
  };
  const listev = async () => {
    const response = await axios.get("http://localhost:5000/events/listev");
    if (response.status == 200) {
      setData(response.data);
    }
  };

  return (
    <div>
      {currentUrl === "http://localhost:3001/allevent" && <Navbar></Navbar>}

      <div class="header-for-bg" style={{ marginTop: 0 }}>
        {currentUrl === "http://localhost:3001/allevent" && (
          <section id="hero">
            <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
              <div class="carousel-inner" role="listbox">
                <div class="carousel-item active" style={{ backgroundImage: "url(home/assets/img/slide/R.jpg)" }}>
                  <div class="carousel-container">
                    <div class="container">
                      <h2 class="animated fadeInDown">
                        <span>Events </span>
                      </h2>
                      <div class="iq-search-bar">
                        <input type="text" class=" text search-input" placeholder="Type here to search..." onChange={(e) => search(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}{" "}
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              {data &&
                data.map((item, index) => {
                  return (
                    <div class="col-sm-6 my-custom-class">
                      <div class="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                        <div class="title-on-header"></div>
                        <div class="event-images">
                          <a href="#">
                            <img class="" src={item.img} width={470} height={250}></img>
                          </a>
                        </div>
                        <div class="iq-card-body">
                          <div class="d-flex">
                            <div class="date-of-event">
                              <span>Jan</span>
                              <h5> {item.date}</h5>
                            </div>
                            <div class="events-detail ml-3">
                              <h5>title : {item.title} </h5>

                              <p class="card-text">
                                description : {item.description}
                                <br></br>location : {item.location} <br></br>organizer : {item.organizer}{" "}
                              </p>
                              <div class="event-member">
                                <div class="iq-media-group">
                                  <a href="#" class="iq-media">
                                    <img class="img-fluid avatar-40 rounded-circle" src="images/user/06.jpg" alt="" />
                                  </a>
                                  <a href="#" class="iq-media">
                                    <img class="img-fluid avatar-40 rounded-circle" src="images/user/05.jpg" alt="" />
                                  </a>
                                </div>
                                <button type="submit" class="buttonLink w-100">
                                  <NavLink to={`/eventdetails/${item._id}`}>
                                    <i class="fa fa-users"></i>
                                    Register now
                                  </NavLink>
                                </button>
                              </div>
                              <h5 class="card-title">{item.name}</h5>
                            </div>
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
      <br></br>
      <br></br>
      <br></br>

      <div>
        {currentUrl === "http://localhost:3001/allevent" && (
          <footer class="footer py-4">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-4 text-lg-start">Copyright &copy; web Sprint 2023</div>
                <div class="col-lg-4 my-3 my-lg-0">
                  <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <div class="col-lg-4 text-lg-end">
                  <a class="link-dark text-decoration-none me-3" href="#!">
                    Privacy Policy
                  </a>
                  <a class="link-dark text-decoration-none" href="#!">
                    Terms of Use
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default AllEvents;
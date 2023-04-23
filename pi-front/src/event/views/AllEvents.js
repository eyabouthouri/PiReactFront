import { NavLink } from "react-router-dom";
import Topnav from "../../components/Topnav";
import { toast } from "react-toastify";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
const alanKey = "d13ff5f9f607b814c3e0b740da4299d42e956eca572e1d8b807a3e2338fdd0dc/stage";

function AllEvents(props) {
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
      <Navbar></Navbar>

      <div class="header-for-bg">
        <div class="background-header position-relative">
          <img src="images/hi.jpg" class="img-fluid rounded w-100 rounded rounded" alt="profile-bg" />
          <div class="title-on-header">
            <div class="data-block">
              <h2>Our Events</h2>
              <div class="iq-search-bar">
                <input type="text" class="text search-input" placeholder="Type here to search..." onChange={(e) => search(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              {data &&
                data.map((item, index) => {
                  return (
                    <div class="col-sm-6">
                      <div class="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                        <div class="title-on-header"></div>
                        <div class="event-images">
                          <a href="#">
                            <img class="card-img-top" src={process.env.PUBLIC_URL + "/imagee/" + item.img}></img>
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
                                  <a href="#" class="iq-media">
                                    <img class="img-fluid avatar-40 rounded-circle" src="images/user/07.jpg" alt="" />
                                  </a>
                                  <a href="#" class="iq-media">
                                    <img class="img-fluid avatar-40 rounded-circle" src="images/user/08.jpg" alt="" />
                                  </a>
                                  <a href="#" class="iq-media">
                                    <img class="img-fluid avatar-40 rounded-circle" src="images/user/09.jpg" alt="" />
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

      <div>
        <br></br> <br></br> <br></br> <br></br>
        <br></br>
        <footer class="bg-white iq-footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-6">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <a href="privacy-policy.html">Privacy Policy</a>
                  </li>
                  <li class="list-inline-item">
                    <a href="terms-of-service.html">Terms of Use</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-6 text-right">
                Copyright 2020 <a href="#">Web Spirits</a> All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AllEvents;

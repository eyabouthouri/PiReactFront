import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./darkMode.css";
import ThemeButton from "./ThemeButton";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

function ClientCourse(props) {
  const { isLoggedIn } = useSelector((state) => state.session);
  const history = useNavigate();
  const [data, setData] = useState([]);
  const currentUrl = window.location.href;
  useEffect(() => {
    listL();
  }, []);

  const listL = async () => {
    try {
      const response = await axios.get("/course/listCourses");
      setData(response.data);
    } catch (e) {
      toast.error("error");
    }
  };
  const filterCourse = async (cat) => {
    try {
      const response = await axios.get(`/course/filter?category=${cat}`);
      setData(response.data);
      console.log("aaaaaaaa", response.data);
    } catch (e) {
      toast.error("error");
    }
  };

  return (
    <>
      <div>
        {currentUrl === "http://localhost:3001/Course" && <Navbar className="navbar" />}
        {currentUrl === "http://localhost:3001/Course" && (
          <div>
            <section id="hero">
              <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active" style={{ backgroundImage: "url(home/assets/img/slide/R.jpg)" }}>
                    <div class="carousel-container">
                      <div class="container">
                        <h2 class="animated fadeInDown">
                          <span>Hobby Classes </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br></br>
            <br></br>
          </div>
        )}

        <div className="content-page">
          <ThemeButton />
          <div className="container">
            <div class=" d-flex row justify-content-center">
              <div className="container" style={{ textAlign: "center" }}>
                <button style={{ backgroundColor: "#f7be74" }} className="btn " onClick={() => listL()}>
                  ALL
                </button>
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("music")}>
                  Music
                </button>{" "}
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("painting")}>
                  Painting
                </button>{" "}
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("fitness")}>
                  Fitness
                </button>{" "}
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("yoga")}>
                  Yoga
                </button>{" "}
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("dance")}>
                  Dance
                </button>{" "}
                &nbsp; &nbsp;
                <button className="btn " style={{ backgroundColor: "#f7be74" }} onClick={() => filterCourse("cooking")}>
                  Cooking
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
              {data &&
                data.map((item, index) => {
                  return (
                    <div class="col-md-6 col-lg-4">
                      <div class="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                        <div class="event-images">
                          <img class="card-img-top" width={400} height={400} src={item.img} alt="Responsive image" />
                        </div>
                        <h5 className=" text-center" style={{ marginTop: 20, color: "#fca638" }}>
                          {item.title}
                        </h5>

                        <div class="iq-card-body">
                          <div class="d-flex">
                            <div class="date-of-event"></div>
                            <div class="events-detail ml-3">
                              <p style={{ marginBottom: 0 }}>Description : {item.description}</p>
                              <p style={{ marginBottom: 0 }}>Level : {item.level}</p>
                              <p style={{ marginBottom: 0 }}>Category : {item.category}</p>
                              <p style={{ marginBottom: 30 }}>
                                <i class="bi bi-clock"></i> Duration : {item.duration} Hours
                              </p>
                            </div>
                          </div>
                          <div class="col-sm-24 d-flex row justify-content-center">
                            {item.lessons.length === 0 && (
                              <i className="bi bi-info-circle" style={{ color: "orange" }}>
                                {" "}
                                This class has no lessons{" "}
                              </i>
                            )}
                            <div data-tooltip-id={"my-tooltip" + index}>
                              <Tooltip id={"my-tooltip" + index} content={item.lessons.length === 0 ? "Class has no lessons" : ""} />
                              <div className={"btn buttonLink " + (item.lessons.length === 0 ? "disabled" : "")} data-toggle={isLoggedIn ? "" : "modal"} data-target="#CourseSignIn">
                                {isLoggedIn ? (
                                  <Link to={`/clientLesson/${item._id}`} className="buttonLink">
                                    Start the lessons
                                  </Link>
                                ) : (
                                  "Start the lessons"
                                )}
                              </div>
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
      <br></br>
      <div class="modal fade" id="CourseSignIn" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                You're not signed in!
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">To access lessons, you need to sign in!</div>
            <div class="modal-footer">
              <div
                onClick={() => {
                  history("/SignIn");
                }}
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Go to sign in page
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentUrl === "http://localhost:3001/Course" && <Footer />}
    </>
  );
}

export default ClientCourse;

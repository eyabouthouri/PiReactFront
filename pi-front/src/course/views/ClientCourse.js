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

  return (
    <>
      <div>
        <Navbar className="navbar" />
        <div class="header-for-bg" style={{ marginTop: 0 }}>
          <div class="background-header position-relative">
            <img src="/images/page-img/profile-bg9.jpg" class="img-fluid w-100 rounded rounded" alt="profile-bg" />
            <div class="title-on-header">
              <div class="data-block">
                <h2>Learn and Enjoy!</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content-page">
          <ThemeButton />
          <div className="container">
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
                              <p style={{ marginBottom: 30 }}>Category : {item.category}</p>
                            </div>
                          </div>
                          <div class="col-sm-24 d-flex row justify-content-center">
                            {item.lessons.length === 0 && (
                              <i className="bi bi-info-circle" style={{ color: "orange" }}>
                                {" "}
                                This course has no lessons{" "}
                              </i>
                            )}
                            <div data-tooltip-id={"my-tooltip" + index}>
                              <Tooltip id={"my-tooltip" + index} content={item.lessons.length === 0 ? "Course has no lessons" : ""} />
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
      <Footer />
    </>
  );
}

export default ClientCourse;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShowLessonContent from "./ShowLessonContent";
import ThemeButton from "./ThemeButton";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "reactjs-popup";
import "./darkMode.css";
import "reactjs-popup/dist/index.css";

axios.defaults.withCredentials = true;

function ClientLesson(props) {
  const { courseId, lessonId } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState();
  const [selectedLessonIndex, setSelectedLessonIndex] = useState();
  const selectedLesson = list[selectedLessonIndex];
  const history = useNavigate();

  useEffect(() => {
    listL();
    getCourse();
  }, []);

  const listL = async () => {
    try {
      const response = await axios.get("/lesson/listLessons/" + courseId);
      const sortedList = response.data.sort((a, b) => {
        if (a.number > b.number) {
          return 1;
        }
        if (a.number < b.number) {
          return -1;
        }
        return 0;
      });
      setList(sortedList);
      if (sortedList.length) {
        setSelectedLessonIndex(0);
      }
    } catch (e) {
      toast.error("fail to get data");
    }
  };

  const getCourse = async () => {
    try {
      const response = await axios.get("/course/getOneCourse/" + courseId);
      setCourse(response.data);
    } catch (e) {
      toast.error("fail to get data");
    }
  };

  return (
    <>
      <div>
        <Navbar />

        <div class="header-for-bg" style={{ marginTop: 0 }}>
          <div class="background-header position-relative">
            <img src="/images/hobbyy.png" class="img-fluid w-100 rounded rounded" style={{ height: 340 }} alt="profile-bg" />
          </div>
        </div>

        <div className="content-page">
          <ThemeButton />
          <div className="row" style={{ marginTop: 0, marginBottom: 0 }}>
            <ul style={{ display: "flex", flexDirection: "column", width: 300, marginLeft: 20, borderRight: "solid", borderWidth: 1, borderColor: "#fca638" }}>
              {list &&
                list.map((lesson, index) => {
                  return (
                    <>
                      <li
                        className={"btn " + (selectedLesson._id === lesson._id ? "" : "iq-bg-danger")}
                        style={{ backgroundColor: selectedLesson._id === lesson._id ? "#f7be74" : "white", padding: "15px", borderRadius: 0 }}
                        onClick={() => {
                          setSelectedLessonIndex(index);
                        }}
                      >
                        Lesson {index + 1}
                      </li>
                    </>
                  );
                })}
            </ul>
            <div className="container d-flex flex-column align-items-center" style={{ marginTop: 0, marginBottom: 0, marginRight: 150 }}>
              {!course && (
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              {course && (
                <div>
                  <h2 className=" text-center" style={{ color: "#fca638" }}>
                    {course.title}
                  </h2>
                  <p className=" text-center" style={{ marginTop: 20 }}>
                    {course.description}
                  </p>
                </div>
              )}
              <div>
                {selectedLesson && <ShowLessonContent lesson={selectedLesson} width={800} height={500} />}
                {list.length == 0 && "no lessons"}
              </div>
              <br></br>
              <br></br>
              {selectedLessonIndex !== list.length - 1 && (
                <div style={{ float: "right" }}>
                  <a
                    id="a"
                    className="btn btn-rounded iq-bg-danger"
                    type="submit"
                    onClick={() => {
                      setSelectedLessonIndex((prevIndex) => prevIndex + 1);
                    }}
                  >
                    Next Lesson
                  </a>
                </div>
              )}
              {selectedLessonIndex === list.length - 1 && (
                <div style={{ float: "right" }}>
                  <button type="button" className="btn btn-rounded iq-bg-danger" data-toggle="modal" data-target="#ClientLesson">
                    Finish Lessons Course
                  </button>
                  <div class="modal fade" id="ClientLesson" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Course Finished
                          </h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">You finished all lessons course, good job! We hope you enjoyed this course!</div>
                        <div class="modal-footer">
                          <div
                            onClick={() => {
                              history("/Course");
                            }}
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Turn back to courses
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
}

export default ClientLesson;

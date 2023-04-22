import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [selectedLesson, setSelectedLesson] = useState();
  const [index, setIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  console.log(index);

  useEffect(() => {
    listL();
  }, [index]);

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
        setSelectedLesson(sortedList[0]);
      }
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
            <img src="/images/page-img/profile-bg9.jpg" class="img-fluid w-100 rounded rounded" alt="profile-bg" />
            <div class="title-on-header">
              <div class="data-block">
                <h2>Learn and Enjoy!</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content-page">
          <Popup trigger={<button className="button"> Open Modal </button>} modal nested>
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Modal Title </div>
                <div className="content">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </div>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  close modal
                </button>
              </div>
            )}
          </Popup>

          <ThemeButton />
          <div className="row">
            <ul style={{ display: "flex", flexDirection: "column", marginLeft: 120 }}>
              <br></br>
              <br></br>
              <br></br>
              {list &&
                list.map((lesson, index) => {
                  return (
                    <>
                      <li
                        className={"btn btn-rounded " + (selectedLesson._id === lesson._id ? "" : "iq-bg-danger")}
                        style={{ backgroundColor: selectedLesson._id === lesson._id ? "#FCDC00" : "white", padding: "15px", borderRadius: "10px" }}
                        onClick={() => {
                          setSelectedLesson(lesson);
                        }}
                      >
                        Lesson {index + 1}
                      </li>
                    </>
                  );
                })}
            </ul>
            <div className="container">
              <div>
                {selectedLesson && <ShowLessonContent lesson={selectedLesson} width={800} height={620} />}
                {list.length == 0 && "no lessons"}
              </div>
              <div style={{ float: "right" }}>
                <a
                  id="a"
                  className="btn btn-rounded iq-bg-danger"
                  type="submit"
                  onClick={() => {
                    setSelectedLesson((prevLesson) => {
                      const currentLessonIndex = list.findIndex((l) => l._id === prevLesson._id);
                      return list[currentLessonIndex + 1];
                    });
                  }}
                >
                  Next Lesson
                </a>
              </div>
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

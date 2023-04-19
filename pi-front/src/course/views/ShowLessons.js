import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import ShowLessonContent from "./ShowLessonContent";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

function ShowLessons(props) {
  const { courseId } = useParams();
  const [data, setData] = useState([]);
  const timeOut = useRef(0);

  useEffect(() => {
    listLessons();
  }, []);

  const listLessons = async () => {
    try {
      const response = await axios.get("/lesson/listLessons/" + courseId);
      setData(response.data);
    } catch (e) {
      toast.error("samahni smeh");
    }
  };

  const deleteLesson = async (id) => {
    try {
      const response = await axios.delete(`/lesson/deleteLesson/${id}`, { withCredentials: true });
      toast.success("lesson tfaskhet");
      listLessons();
    } catch (e) {
      toast.error("tfasakhch");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteLesson(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listLessons();
        } else {
          const response = await axios.get(`/lesson/searchLesson/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 1000);
  };

  return (
    <div id="content-page" class="content-page">
      <div>
        <Navbarback />
        <div>
          <SideBar />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="inner-page-title">
            <h3 class="text-white">Editable Table Page</h3>
            <p class="text-white">lorem ipsum</p>
          </div>
          <div class="col-sm-12">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Editable Table</h4>
                </div>
              </div>{" "}
            </div>
            <div class="container">
              <div id="table" class="table-editable">
                <Link to={`/AddLesson/${courseId}`} style={{ float: "right" }}>
                  <button type="button" class="btn btn-primary" style={{ float: "right" }}>
                    Add new lesson
                  </button>
                </Link>
                <br></br>
                <br></br>
                <div class="iq-search-bar">
                  <div class="searchbox">
                    <input type="text" class="text search-input" placeholder="Type here to search..." onChange={(e) => search(e.target.value)} />
                    <a class="search-link" href="JavaScript:void(0)">
                      <i class="ri-search-line" />
                      <i />
                    </a>
                  </div>
                </div>
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-ligh" style={{ backgroundColor: "#4d8cc4", color: "white" }}>
                    <tr>
                      <th>Number</th>
                      <th>Type </th>
                      <th>Content</th>
                      <th colspan="2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      Array.from(data).map((item, index) => {
                        return (
                          <tr>
                            <td class="contenteditable">{item.number}</td>
                            <td class="contenteditable">{item.type}</td>
                            <td class="contenteditable">
                              <ShowLessonContent width={400} height={300} lesson={item} />
                            </td>
                            <td>
                              <Link to={`/updateLesson/${item._id}`}>
                                <button type="button" className="btn btn-danger ">
                                  Update
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button type="button" className="btn btn-danger " onClick={() => confirmDelete(item._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>{" "}
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default ShowLessons;

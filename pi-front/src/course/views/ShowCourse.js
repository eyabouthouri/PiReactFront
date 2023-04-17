import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function ShowCourse(props) {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(0);
  const [filterBy, setFilterBy] = useState("");
  const timeOut = useRef(0);
  useEffect(() => {
    listCourses();
  }, []);

  const filterAndOrder = (key) => {
    let o;
    if (filterBy !== key) {
      o = 1;
    } else {
      o = -order;
    }
    setOrder(o);
    setFilterBy(key);
    sortCourse(key, o);
  };

  const listCourses = async () => {
    try {
      const response = await axios.get("/course/listCourses");
      setData(response.data);
    } catch (e) {
      toast.error("list error");
    }
  };

  const sortCourse = async (f, o) => {
    try {
      const response = await axios.get(`/course/listCourses?sort=${f}&order=${o}`);
      setData(response.data);
    } catch (e) {
      toast.error("error");
    }
  };

  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listCourses();
        } else {
          const response = await axios.get(`/course/search/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 1000);
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`/course/deleteCourse/${id}`, { withCredentials: true });
      toast.success("course deleteed");
      listCourses();
    } catch (e) {
      toast.error("error delete");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCourse(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
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
              <div className="container">
                <div id="table" class="table-editable">
                  <Link to="/AddCourse">
                    <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                      Add new course
                    </button>
                  </Link>
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
                    <thead class="thead-dark">
                      <tr>
                        <th>Image</th>
                        <th onClick={() => filterAndOrder("title")}>
                          Title {(filterBy !== "title" || order === 0) && <i class="fa fa-sort"></i>}
                          {filterBy === "title" && order === -1 && <i class="fa fa-sort-desc"></i>}
                          {filterBy === "title" && order === 1 && <i class="fa fa-sort-asc"></i>}
                        </th>
                        <th>
                          Desciption<i class="fa fa-sort" ></i>
                        </th>
                        <th onClick={() => filterAndOrder("level")}>
                          Level {(filterBy !== "level" || order === 0) && <i class="fa fa-sort"></i>}
                          {filterBy === "level" && order === -1 && <i class="fa fa-sort-desc"></i>}
                          {filterBy === "level" && order === 1 && <i class="fa fa-sort-asc"></i>}
                        </th>
                        <th onClick={() => filterAndOrder("category")}>
                          Category {(filterBy !== "category" || order === 0) && <i class="fa fa-sort"></i>}
                          {filterBy === "category" && order === -1 && <i class="fa fa-sort-desc"></i>}
                          {filterBy === "category" && order === 1 && <i class="fa fa-sort-asc"></i>}
                        </th>
                        <th onClick={() => filterAndOrder("duration")}>
                          Duration {(filterBy !== "duration" || order === 0) && <i class="fa fa-sort"></i>}
                          {filterBy === "duration" && order === -1 && <i class="fa fa-sort-desc"></i>}
                          {filterBy === "duration" && order === 1 && <i class="fa fa-sort-asc"></i>}{" "}
                        </th>
                        <th>Action</th>
                        <th>Lessons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                {" "}
                                <img class="img-fluid img-thumbnail" width={250} height={250} src={item.img}></img>{" "}
                              </td>
                              <td class="contenteditable">{item.title}</td>
                              <td class="contenteditable">{item.description}</td>
                              <td class="contenteditable">{item.level}</td>
                              <td class="contenteditable">{item.category}</td>
                              <td class="contenteditable">{item.duration}</td>
                              <td>
                                <Link to={`/updateCourse/${item._id}`}>
                                  <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" style={{ marginBottom: "20px;" }}>
                                    Update
                                  </button>
                                </Link>
                                <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => confirmDelete(item._id)}>
                                  Delete
                                </button>
                              </td>
                              <td>
                                <Link to={`/AddLesson/${item._id}`}>
                                  <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                                    Add lesson
                                  </button>
                                </Link>
                                <Link to={`/ShowCourseLessons/${item._id}`}>
                                  <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                                    View Lessons
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCourse;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import ShowLessonContent from "./ShowLessonContent";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/theme";

axios.defaults.withCredentials = true;

function ShowLessons(props) {
  const [state, setState] = useState();
  // const x = useState();
  // const state = x[0];
  // const setState = x[1];
  const users = useSelector((state) => state.theme.users);
  const dispatch = useDispatch();
  const updateUsers = () => {
    dispatch(
      setUsers({
        users: ["Sami", "Dorsaf", "Wassim"],
      })
    );
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
                <Link to={`/AddLesson/${courseId}`}>
                  <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                    Add new lesson
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
                      <th>Number</th>
                      <th>Type </th>
                      <th>Content</th>
                      <th>Action</th>
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
                                <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                                  update
                                </button>
                              </Link>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => confirmDelete(item._id)}>
                                delete
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

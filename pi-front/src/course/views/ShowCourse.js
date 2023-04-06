import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Course from "./ClientCourse";
function ShowCourse(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    listL();
  }, []);

  const listL = async () => {
    const response = await axios.get("http://localhost:5000/course/listL");
    if (response.status == 200) {
      setData(response.data);
    }
  };

  const deleteL = async (id) => {
    const response = await axios
      .delete(`http://localhost:5000/course/deleteL/${id}`, { withCredentials: true })
      .then(listL())
      .catch((err) => {
        console.error(err);
      });
    return response.data;
  };
  const lesson = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/lesson/listL/${id}`, data);
    if (response.status == 200) {
      toast.success(response.data);
      listL();
    }
  };

  return (
    <div id="content-page" class="content-page">
      <div id="root">
        <Navbarback />
        <div id="root">
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
                <Link to="/AddCourse">
                  <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                    Add new course
                  </button>
                </Link>

                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th>Image</th>
                      <th>title</th>
                      <th>desciption </th>
                      <th>level</th>
                      <th>Category</th>
                      <th>Duration</th>
                      <th>Action</th>

                      {/* <th>Tel</th>
                      <th>id</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      data.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              {" "}
                              <img class="img-fluid img-thumbnail" src={process.env.PUBLIC_URL + "/images/" + item.img}></img>{" "}
                            </td>
                            <td class="contenteditable">{item.title}</td>
                            <td class="contenteditable">{item.description}</td>
                            <td class="contenteditable">{item.level}</td>
                            <td class="contenteditable">{item.category}</td>
                            <td class="contenteditable">{item.duration}</td>
                            {/* <td class="contenteditable">{item.tel}</td> */}

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
                              <Link to={`/updateL/${item._id}`}>
                                <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                                  update
                                </button>
                              </Link>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => deleteL(item._id)}>
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

export default ShowCourse;

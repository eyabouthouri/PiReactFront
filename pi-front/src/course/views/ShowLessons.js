import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Course from "./ClientCourse";

axios.defaults.withCredentials = true;

function ShowLessons(props) {
  const { courseId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    listL();
  }, []);

  const listL = async () => {
    const response = await axios.get("http://localhost:5000/lesson/listL/" + courseId);
    if (response.status == 200) {
      console.log("aaaaaaaaaaa", response.data);
      setData(response.data);
    }
  };

  const deleteL = async (id) => {
    const response = await axios
      .delete(`http://localhost:5000/lesson/deleteL/${id}`, { withCredentials: true })
      .then(listL())
      .catch((err) => {
        console.error(err);
      });
    return response.data;
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
                    Add new lesson
                  </button>
                </Link>

                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th>number</th>
                      <th>type </th>
                      <th>content</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      Array.from(data).map((item, index) => {
                        const lien = new URLSearchParams(item.content?.split("?")[1]);
                        const videoId = lien?.get("v");
                        return (
                          <tr>
                            <td class="contenteditable">{item.number}</td>
                            <td class="contenteditable">{item.type}</td>
                            <td class="contenteditable">
                              {item.type === "image" && <img src={item.content} width={250} height={250} />}
                              {item.type === "text" && item.content}
                              {item.type === "youtube" && (
                                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + videoId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                              )}
                              {item.type === "video" && <video controls width={250} height={250} src={item.content} />}
                            </td>
                            <td>
                              <Link to={`/updateLesson/${item._id}`}>
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

export default ShowLessons;

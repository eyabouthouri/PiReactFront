import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useNavigate, Link, NavLink } from "react-router-dom";
import Progress from "../../components/Progress";
axios.defaults.withCredentials = true;

function AddLesson(props) {
  const { courseId, id } = useParams();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [state, setState] = useState({ number: "", type: "", content: "", courseId });

  const addL = async (data, filePath) => {
    const response = await axios.post("/lesson/addl", {
      number: data.number,
      type: data.type,
      content: data.type === "text" || data.type === "youtube" ? data.content : filePath,
      courseId: data.courseId,
    });
    toast.success("addeddddd");
  };
  const updateLesson = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/lesson/updatel/${id}`, data);
    if (response.status == 200) {
      toast.success("aaaaa333");
    }
  };
  var history = useNavigate();

  // function readFile(input) {
  //   let file = input.files[0];

  //   let reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   reader.onload = function () {
  //     setState({ ...state, content: reader.result });
  //   };

  //   // reader.onerror = function() {
  //   //   console.log(reader.error);
  //   // };
  // }
  useEffect(() => {
    if (id) {
      getOneL(id);
    }
  }, [id]);
  const getOneL = async (id) => {
    const response = await axios.get(`http://localhost:5000/lesson/getOnel/${id}`);
    setState({ ...response.data[0] });
  };

  const Handelsubmit = async (e) => {
    e.preventDefault();
    let filePath;
    try {
      if (state.type === "video" || state.type === "image") {
        const formData = new FormData();
        formData.append("file", state.file);
        const res = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          },
        });
        filePath = res.data.filePath;
      }
      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 30000);

      if (!id) {
        addL(state, filePath);
      } else {
        updateLesson(state, id);
      }
    } catch (err) {
      toast.error("There was a problem with the server");
      setUploadPercentage(0);
    }
    // history("/ShowCourseLessons/"+courseId);
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "type") {
      setState({ ...state, [name]: value, content: null, fileName: null, file: null });
    } else {
      if (e.target.type === "file") setState({ ...state, file: e.target.files[0], fileName: e.target.files[0].name });
      else {
        setState({ ...state, [name]: value });
      }
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
      <div class="container">
        <div class="col-sm-12 col-lg-12">
          <div class="iq-card">
            <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Add Lesson</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <ul id="top-tab-list" class="p-0">
                <li class="active" id="account">
                  <a href="javascript:void();">
                    <i class="ri-lock-unlock-line"></i>
                    <span>Account</span>
                  </a>
                </li>
                <li id="payment">
                  <a href="javascript:void();">
                    <i class="ri-camera-fill"></i>
                    <span>Image</span>
                  </a>
                </li>
                <li id="confirm">
                  <a href="javascript:void();">
                    <i class="ri-check-fill"></i>
                    <span>Finish</span>
                  </a>
                </li>
              </ul>
              <form id="form-wizard1" class="text-center mt-4" methode="POST" onSubmit={Handelsubmit}>
                <div class="form-card text-left">
                  <div class="row">
                    <div class="col-7">
                      <h3 class="mb-4">Lesson Information:</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label htmlFor="title">Number </label>
                        <input type="text" className="form-control" name="number" placeholder="number" onChange={handleInputChange} value={state.number} />
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="description">type</label>
                          <div class="col-sm-10">
                            <select name="type" class="form-control" onChange={handleInputChange}>
                              <option disabled selected value>
                                {" "}
                                -- select an option --{" "}
                              </option>
                              <option value="image">Image</option>
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                              <option value="youtube">Youtube</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="level">content</label>
                          {state.type === "text" && <input type="text" className="form-control" name="content" placeholder="content" onChange={handleInputChange} value={state.content} />}
                          {state.type === "image" && <input type="file" accept="image/*" className="form-control" name="content" placeholder="aa" onChange={handleInputChange} />}
                          {state.type === "video" && <input type="file" accept="video/*" className="form-control" name="content" placeholder="content" onChange={handleInputChange} value={state.content} />}
                          {state.type === "youtube" && <input type="text" className="form-control" name="content" placeholder="youtube" onChange={handleInputChange} value={state.content} />}
                        </div>
                      </div>
                      <Progress percentage={uploadPercentage} />
                    </div>
                  </div>

                  <input type="submit" value={id ? "Update" : "Add"} />
                </div>
              </form>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;

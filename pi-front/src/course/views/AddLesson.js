import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useNavigate, Link, NavLink } from "react-router-dom";
import Progress from "../../components/Progress";
import { useForm } from "react-hook-form";
axios.defaults.withCredentials = true;

function AddLesson(props) {
  const { courseId, id } = useParams();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [state, setState] = useState({ number: "", type: "", content: "", courseId });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields, keepDefaultValues },
  } = useForm({ mode: "onBlur", defaultValues: state });
  console.log(state);

  useEffect(() => {
    if (id) {
      getLesson();
    }
  }, []);

  const getLesson = async () => {
    try {
      const response = await axios.get("/lesson/getOneLesson/" + id);
      setState(response.data);
    } catch (e) {
      toast.error("error add");
    }
  };

  const addLesson = async (data, filePath) => {
    try {
      const response = await axios.post("/lesson/addLesson", {
        number: data.number,
        type: data.type,
        content: data.type === "text" || data.type === "youtube" ? data.content : filePath,
        courseId: data.courseId,
      });
      toast.success("addeddddd");
      history("/ShowCourseLessons/" + courseId);
    } catch (e) {
      toast.error("error add lesson");
    }
  };
  const updateLesson = async (data, id, filePath) => {
    try {
      const response = await axios.put(`/lesson/updateLesson/${id}`, {
        ...data,
        content: filePath ?? data.content,
      });
      toast.success("update success");
      history("/ShowCourseLessons/" + state.courseId);
    } catch (e) {
      toast.error("error update");
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

  const Handelsubmit = async (e) => {
    let filePath;
    try {
      if (state.file) {
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
      }
      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 30000);
      if (!id) {
        addLesson(state, filePath);
      } else {
        updateLesson(state, id, filePath);
      }
    } catch (err) {
      toast.error("There was a problem with the server");
      setUploadPercentage(0);
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "type") {
      setState({ ...state, [name]: value, content: null, fileName: null, file: null });
    } else {
      if (e.target.type === "file") {
        setState({ ...state, file: e.target.files[0], fileName: e.target.files[0].name });
      } else {
        setState({ ...state, [name]: value });
      }
    }
  };

  return (
    <div id="content-page" class="content-page">
      <div>
        <Navbarback />
        <div>
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
                    <span>Add Lesson</span>
                  </a>
                </li>
                <li id="confirm">
                  <a href="javascript:void();">
                    <i class="ri-check-fill"></i>
                    <span>Finish</span>
                  </a>
                </li>
              </ul>
              <form id="form-wizard1" class="text-center mt-4" methode="POST" onSubmit={handleSubmit(Handelsubmit)}>
                <div class="form-card text-left">
                  <div class="row">
                    <div class="col-7">
                      <h3 class="mb-4">Lesson Information:</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Lesson number </label>
                        <input type="number" className={"form-control " + (errors.number ? "is-invalid" : "")} name="number" placeholder="number" {...register("number", { required: true })} onChange={handleInputChange} value={state.number} />
                        {errors.number && <span style={{ color: "red" }}> Lesson number is required</span>}
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="description">Content Type</label>
                          <div class="col-sm-10">
                            <select name="type" className={"form-control " + (errors.type ? "is-invalid" : "")} {...register("type", { required: true })} onChange={handleInputChange}>
                              <option disabled selected value>
                                {" "}
                                -- select an option --{" "}
                              </option>
                              <option value="image">Image</option>
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                              <option value="youtube">Youtube</option>
                            </select>
                            {errors.type && <span style={{ color: "red" }}>Select a lesson type</span>}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="level">{state.type === "text" ? "Text" : state.type === "image" ? "Image" : state.type === "video" ? "Video" : "Youtube"}</label>
                          {state.type === "text" && <textarea width={500} height={"250px"} rows={6} type="text" className="form-control" name="content" placeholder="content" onChange={handleInputChange} value={state.content} />}
                          {state.type === "image" && <input type="file" accept="image/*" className="form-control" name="content" placeholder="aa" {...register("content", { required: true })} onChange={handleInputChange} />}
                          {state.type === "video" && <input type="file" accept="video/*" className="form-control" name="content" placeholder="content" onChange={handleInputChange} />}
                          {state.type === "youtube" && <input type="text" className="form-control" name="content" placeholder="youtube" onChange={handleInputChange} value={state.content} />}
                        </div>
                      </div>
                      <Progress percentage={uploadPercentage} />
                    </div>
                  </div>
                  <br></br>
                  <input type="submit" disabled={!isValid} className="btn btn-primary " value={id ? "Update" : "Add"} />
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

import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Progress from "../../components/Progress";
import { useForm } from "react-hook-form";

axios.defaults.withCredentials = true;

function AddCourse(props) {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [state, setState] = useState({ title: "", description: "", level: "", category: "", duration: "", img: "" });
  const { id } = useParams();
  var history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get("/course/getOneCourse/" + id);
      setState(response.data);
    } catch (e) {
      toast.error("error add");
    }
  };

  const addCourse = async (data, filePath) => {
    try {
      const response = await axios.post("/course/addCourse", {
        title: data.title,
        description: data.description,
        level: data.level,
        category: data.category,
        duration: data.duration,
        img: filePath,
      });
      toast.success("Course added Successfully");
      history("/ShowCourse");
    } catch (e) {
      toast.error("Error Add");
    }
  };
  const updateCourse = async (data, id, filePath) => {
    try {
      const response = await axios.put(`/course/updateCourse/${id}`, {
        ...data,
        img: filePath ?? data.img,
      });
      toast.success("Course Updated");
      history("/ShowCourse");
    } catch (e) {
      toast.error("Update course error");
    }
  };

  const Handelsubmit = async (e) => {
    let filePath;
    try {
      if (state.file) {
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
      if (!id) {
        addCourse(state, filePath);
      } else {
        updateCourse(state, id, filePath);
      }
    } catch (err) {
      toast.error("There was a problem with the server");
      setUploadPercentage(0);
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "file") {
      setState({ ...state, file: e.target.files[0], fileName: e.target.files[0].name });
    } else {
      setState({ ...state, [name]: value });
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
                <h4 class="card-title">Add Course</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <ul id="top-tab-list" class="p-0">
                <li class="active" id="account">
                  <a href="javascript:void();">
                    <i class="ri-lock-unlock-line"></i>
                    <span>Add Course</span>
                  </a>
                </li>
                <li id="confirm">
                  <a href="javascript:void();">
                    <i class="ri-check-fill"></i>
                    <span>Finish</span>
                  </a>
                </li>
              </ul>
              {(!id || state._id) && (
                <form id="form-wizard1" class="text-center mt-4" method="POST" onSubmit={handleSubmit(Handelsubmit)}>
                  <div class="form-card text-left">
                    <div class="row">
                      <div class="col-7">
                        <h3 class="mb-4">Course Information:</h3>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="title">Title </label>
                          <input type="text" className={"form-control " + (errors.title ? "is-invalid" : "")} name="title" placeholder="title" {...register("title", { required: true, minLength: 5 })} onChange={handleInputChange} value={state.title} />
                          {errors.title && <span style={{ color: "red" }}> Title is required and must be more than 5 caracteres</span>}
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea type="text" className={"form-control " + (errors.description ? "is-invalid" : "")} name="description" {...register("description", { required: true, minLength: 2 })} placeholder="description" onChange={handleInputChange} value={state.description} />
                            {errors.description && <span style={{ color: "red" }}> Description is required and must be more than 5 caracteres</span>}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label htmlFor="level">Level</label>
                            <select value={state.level} name="level" className={"form-control " + (errors.level ? "is-invalid" : "")} {...register("level", { required: true })} onChange={handleInputChange}>
                              <option selected value="" disabled hidden>
                                -- select an option --
                              </option>
                              <option value="beginner">Beginner</option>
                              <option selected value="competent">
                                Competent
                              </option>
                              <option value="proficient">Proficient</option>
                              <option value="expert">Expert</option>
                            </select>
                            {errors.level && <span style={{ color: "red" }}> Select a level</span>}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label htmlFor="category">Category</label>
                            <select value={state.category} name="category" className={"form-control " + (errors.category ? "is-invalid" : "")} {...register("category", { required: true })} onChange={handleInputChange}>
                              <option selected value="" disabled hidden>
                                -- select an option --
                              </option>
                              <option value="music">Music</option>
                              <option value="painting">Painting</option>
                              <option value="fitness">Fitness</option>
                              <option value="yoga">Yoga</option>
                              <option value="dance">Dance</option>
                              <option value="cooking">Cooking</option>
                              <option value="langues">Langage</option>
                            </select>
                            {errors.category && <span style={{ color: "red" }}> Category is required and must be more than 5 caracteres</span>}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label htmlFor="Duration">duration</label>
                            <input type="number" className={"form-control " + (errors.duration ? "is-invalid" : "")} name="duration" {...register("duration", { required: true })} placeholder="duration" onChange={handleInputChange} value={state.duration} />
                            {errors.duration && <span style={{ color: "red" }}> Duration is required and must be more than 5 caracteres</span>}
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="file-upload">Photo</label>
                          <br></br>
                          <input id="file-upload" type="file" name="img" {...register("img", { required: !id })} onChange={handleInputChange}></input>
                          {errors.img && <span style={{ color: "red" }}> Select a picture</span>}
                          {id && state._id && <img width={200} height={200} src={state.img}></img>}
                        </div>
                        <Progress percentage={uploadPercentage} />
                      </div>
                    </div>
                    <br></br>
                    <input className="btn btn-primary " type="submit" value={id ? "Update" : "Add"} disabled={!isValid} />
                  </div>
                </form>
              )}
              {!state._id && id && (
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
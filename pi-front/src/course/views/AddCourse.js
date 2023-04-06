import React, { useEffect, useState } from "react";
import Fildest from "../../components/Fildest";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import StepDeux from "../../components/StepDeux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useNavigate, Link, NavLink } from "react-router-dom";
import Course from "./ClientCourse";
axios.defaults.withCredentials = true;
const initialState = {
  title: "",
  description: "",
  level: "",
  category: "",
  duration: "",
  img: "",
};

function AddCourse(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    listL();
  }, []);

  const [state, setState] = useState(initialState);
  const { title, desciption, level, category, duration, img } = state;
  const listL = async () => {
    const response = await axios.get("http://localhost:5000/course/listL");
    if (response.status == 200) {
      setData(response.data);
    }
  };

  const addL = async (data) => {
    const response = await axios.post("http://localhost:5000/course/addl", data);
    toast.success(response.data);
    listL();
  };
  const updateL = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/course/updatel/${id}`, data);
    if (response.status == 200) {
      toast.success(response.data);
      listL();
    }
  };
  var history = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getOneL(id);
    }
  }, [id]);
  var self = this;
  const getOneL = async (id) => {
    const response = await axios.get(`http://localhost:5000/course/getOnel/${id}`);
    setState({ ...response.data[0] });
  };

  const Handelsubmit = (e) => {
    e.preventDefault();
    if (!id) {
      addL(state);
    } else {
      updateL(state, id);
    }
    history("/ShowCourse");
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
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
                <h4 class="card-title">Add Course</h4>
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
                      <h3 class="mb-4">Course Information:</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label htmlFor="title">Title </label>
                        <input type="text" className="form-control" name="title" placeholder="title" onChange={handleInputChange} value={state.title} />
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="description">Description</label>
                          <input type="text" className="form-control" name="description" placeholder="description" onChange={handleInputChange} value={state.description} />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="level">Level</label>
                          <input type="text" className="form-control" name="level" placeholder="level" onChange={handleInputChange} value={state.level} />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="category">category</label>
                          <input type="text" className="form-control" name="category" placeholder="category" onChange={handleInputChange} value={state.category} />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="Duration">duration</label>
                          <input type="number" className="form-control" name="duration" placeholder="duration" onChange={handleInputChange} value={state.duration} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="file-upload">Photo</label>
                        <input id="file-upload" type="file" name="img" onChange={handleInputChange} value={state.img}></input>
                      </div>
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

export default AddCourse;

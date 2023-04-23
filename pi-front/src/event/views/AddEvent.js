import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Store } from "react-notifications-component";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

axios.defaults.withCredentials = true;
function AddEvent(props) {
  const initialState = { title: "", description: "", location: "", organizer: "", date: "", img: "" };

  const [input, setinput] = useState(initialState);
  const [validd, setValid] = useState(true);

  const history = useNavigate();
  const [msg, setmsg] = useState("");
  const [state, setState] = useState(initialState);
  const addev = async () => {
    try {
      const res = await axios.post(
        "/events/addev",
        {
          title: input.title,
          description: input.description,
          location: input.location,
          organizer: input.organizer,
          date: input.date,
          img: input.img,
        },
        { withCredentials: true }
      );
      Store.addNotification({
        title: "Add Event",
        message: "Event added successfully",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      history("/ShowEvent");
    } catch (err) {
      setValid(false);
      console.error(err.response.data);
      setmsg(err.response.data);
    }
  };

  const {
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const Handelsubmit = (e) => {
    e.preventDefault();
    addev();
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
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
                <h4 class="card-title">Add Event</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <form onSubmit={Handelsubmit} id="form-wizard1" class="text-center mt-4">
                <ul id="top-tab-list" class="p-0">
                  <li class="active" id="account">
                    <a href="javascript:void();">
                      <i class="ri-lock-unlock-line"></i>
                      <span>Event</span>
                    </a>
                  </li>

                  <li id="confirm">
                    <a href="javascript:void();">
                      <i class="ri-check-fill"></i>
                      <span>Finish</span>
                    </a>
                  </li>
                </ul>
                <fieldset>
                  <div class="form-card text-left">
                    <div class="row">
                      <div class="col-7">
                        <h3 class="mb-4">Event Information:</h3>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>title: *</label>
                          <input type="text" class="form-control mb-0" name="title" onChange={handleInputChange} value={input.title} placeholder=" title" />
                          {!validd && msg.title && <span style={{ color: "red" }}>{msg.title}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>description: *</label>
                          <input type="text" class="form-control" name="description" placeholder="description" onChange={handleInputChange} value={input.description} />
                          {!validd && msg.description && <span style={{ color: "red" }}>{msg.description}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>location: *</label>
                          <input type="text" class="form-control" name="location" placeholder="location" onChange={handleInputChange} value={input.location} />
                          {!validd && msg.location && <span style={{ color: "red" }}>{msg.location}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>organizer: *</label>
                          <input type="text" class="form-control" name="organizer" placeholder="organizer" onChange={handleInputChange} value={input.organizer} />
                          {!validd && msg.organizer && <span style={{ color: "red" }}>{msg.organizer}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>date: *</label>
                          <input type="date" class="form-control" name="date" placeholder="date" onChange={handleInputChange} value={input.date} />
                          {!validd && msg.date && <span style={{ color: "red" }}>{msg.date}!! </span>}
                        </div>
                      </div>
                    </div>
                    <div class="col-7">
                      <h3 class="mb-4">Image Upload:</h3>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="file-upload">Photo</label>
                    <input type="file" name="img" onChange={handleInputChange} value={input.img}></input>
                  </div>
                  <button type="submit" name="next" class="btn btn-primary next action-button float-right" disabled={!isValid}>
                    Add
                  </button>
                </fieldset>
              </form>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;

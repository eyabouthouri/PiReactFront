import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Navbarback from "../components/Navbarback";
import SideBar from "../components/SideBar";
import { Store } from "react-notifications-component";
import Progress from "../components/Progress";
axios.defaults.withCredentials = true;
function AjouterCoach(props) {
  const initialState = { name: "", lastname: "", email: "", username: "", pwd: "", specialite: "", biographie: "", telephone: "", adresseCabinet: "" ,image:""};

  const [input, setinput] = useState(initialState);
  const [validd, setValid] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const history = useNavigate();
  const [msg, setmsg] = useState("");
  const addclient = async (filePath) => {
    try {
      await axios.post(
        "/coach/addCoach/coach",
        {
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          username: input.username,
          pwd: input.pwd,
          specialite: input.specialite,
          biographie: input.biographie,
          telephone: input.telephone,
          adresseCabinet: input.adresseCabinet,
          image: filePath,
        },
        { withCredentials: true }
      );

      Store.addNotification({
        title: "Add User coach",
        message: "Coach added successfully",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      history("/ShowCoach");
    } catch (err) {
      console.error(err);
      setValid(false);
      console.error(err.response.data);
      setmsg([...msg, err.response.data]);
    }
  };
  const filepath = async ()=>{
    const formData = new FormData();
      formData.append("file", input.file);
      const res = await axios.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          );
        },
      });
     return res.data.filePath;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filePath = await filepath();
      await addclient(filePath);
    } catch (err) {
      console.error(err);
      setValid(false);
      console.error(err.response.data);
      setmsg([...msg, err.response.data]);
    }
    
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log(e.target.type);
    if (e.target.type === "file") {
      setinput({ ...input, file: e.target.files[0], fileName: e.target.files[0].name });
      console.log(input.file);
    } else {
      setinput({ ...input, [name]: value });
    }
  };
  console.log(input)

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
                <h4 class="card-title">Add Coach</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <form id="form-wizard1" class="text-center mt-4" onSubmit={handleSubmit} method="POST" >
               
                  <div class="form-card text-left">
                    <div class="row">
                      <div class="col-7">
                        <h3 class="mb-4">COACH :</h3>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>First Name: *</label>
                          <input type="text" class="form-control mb-0" name="name" onChange={handleInputChange} value={input.name} placeholder="Your Full Name" />
                          {!validd && <span style={{ color: "red" }}>{msg.name}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Last Name: *</label>
                          <input type="text" class="form-control mb-0" name="lastname" onChange={handleInputChange} value={input.lastname} placeholder="Your Full Name" />
                          {!validd && <span style={{ color: "red" }}>{msg.lastname}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Email: *</label>
                          <input type="email" class="form-control mb-0" name="email" onChange={handleInputChange} value={input.email} placeholder="Your Full Name" />
                          {!validd && <span style={{ color: "red" }}>{msg.email}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Username: *</label>
                          <input type="text" class="form-control mb-0" name="username" onChange={handleInputChange} value={input.username} placeholder="Your Full Name" />
                          {!validd && <span style={{ color: "red" }}>{msg.username}!! </span>}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>specialite: *</label>
                          <input type="text" class="form-control mb-0" name="specialite" onChange={handleInputChange} value={input.specialite} placeholder="specialite" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>biographie *</label>
                          <input type="text" class="form-control mb-0" name="biographie" onChange={handleInputChange} value={input.biographie} placeholder="Your Full Name" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>telephone: *</label>
                          <input type="text" class="form-control mb-0" name="telephone" onChange={handleInputChange} value={input.telephone} placeholder="Your Full Name" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>adresseCabinet: *</label>
                          <input type="text" class="form-control mb-0" name="adresseCabinet" onChange={handleInputChange} value={input.adresseCabinet} placeholder="Your Full Name" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Password: </label>
                          <input type="password" class="form-control mb-0" name="pwd" onChange={handleInputChange} value={input.pwd} placeholder="Your Full Name" />
                          {!validd && <span style={{ color: "red" }}>{msg.pwd}!! </span>}
                        </div>
                      </div>
                    </div>
                    <div class="col-7">
                      <h3 class="mb-4">Image Upload:</h3>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Upload Library Photo:</label>
                    <input id="file-upload" type="file" class="form-control mb-0" name="image" onChange={handleInputChange} placeholder="Your Full Name" />
                    <Progress percentage={uploadPercentage} />
                  </div>
                 
                  <input className="btn btn-primary " type="submit"/>
              
              </form>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterCoach;

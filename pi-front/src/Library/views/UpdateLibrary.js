import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const initialState = {
  name: "",
  pays: "",
  email: "",
  location: "",
  tel: "",
  img: "",
};
function UpdateLibrary(props) {
  const [state, setState] = useState(initialState);
  const [msg, setmsg] = useState({});
  const [valid, setValid] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  const updateL = async (data, id) => {
    try {
      const response = await axios.put(`/library/updatel/${id}`, data);
      history("/ShowLiabrary");
    } catch (err) {
      setValid(false);
      setmsg(err.response.data);
    }
  };
  const getOneL = async () => {
    try {
      const response = await axios.get(`/library/getOnel/${id}`);
      setState(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getOneL();
    }
  }, [id]);

  const {
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const Handelsubmit = (e) => {
    e.preventDefault();

    updateL(state, id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const countrySelect = document.querySelector("#country-select");

  function fillCountrySelect() {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((countries) => {
        // Vider la liste déroulante
        // Ajouter l'option par défaut
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "-- Sélectionnez un pays --";
        countrySelect.appendChild(defaultOption);
        // Ajouter les options des pays
        countries.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.name;
          option.textContent = country.name;
          countrySelect.appendChild(option);
        });
      });
  }

  fillCountrySelect();

  return (
    <div id="content-page" className="content-page">
      <div>
        <Navbarback />
        <div>
          <SideBar />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-edit-list-data">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title">
                          <i className="bi bi-file-earmark-person-fill"></i> Add library
                        </h4>
                      </div>
                    </div>

                    <div className="iq-card-body">
                      <form id="form-wizard1" classNameName="text-center mt-4" method="POST" onSubmit={Handelsubmit}>
                        <div className="row align-items-center">
                          <div className="form-group col-sm-6">
                            <label htmlFor="name">
                              <i className="bi bi-person-bounding-box"></i> Name:
                            </label>
                            <input type="text" className="form-control" name="name" placeholder="name" value={state.name || ""} onChange={(e) => setState({ ...state, name: e.target.value })} />
                            {!valid && msg.name && <span style={{ color: "red" }}>{msg.name}!! </span>}
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="tel">
                              <i className="bi bi-person-bounding-box"></i> Tel:
                            </label>
                            <input type="text" className="form-control" name="tel" placeholder="tel" ovalue={state.tel || ""} onChange={(e) => setState({ ...state, tel: e.target.value })} />
                            {!valid && msg.tel && <span style={{ color: "red" }}>{msg.tel}!! </span>}
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="country-select">
                              <i className="bi bi-joystick"></i> pays:
                            </label>
                            <select className="form-control" id="country-select" name="pays" placeholder="City" value={state.pays || ""} onChange={(e) => setState({ ...state, pays: e.target.value })}>
                              <option selected>-- Sélectionnez un pays --</option>
                            </select>
                            {!valid && msg.pays && <span style={{ color: "red" }}>{msg.pays}!! </span>}
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="location">location:</label>
                            <textarea type="text" className="form-control" name="location" placeholder="write your complete address please..." value={state.location || ""} onChange={(e) => setState({ ...state, location: e.target.value })} />
                          </div>
                          <div className="form-group col-sm-6">
                            <label Htmlfor="email">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                              </svg>{" "}
                              Email:
                            </label>
                            <input type="text" className="form-control" placeholder="exemple@exmpl.com" name="email" value={state.email || ""} onChange={(e) => setState({ ...state, email: e.target.value })} />
                            {!valid && msg.email && <span style={{ color: "red" }}>{msg.email}!! </span>}

                            <div classNameName="form-group"></div>
                          </div>
                        </div>
                        <input type="submit" disabled={!isValid} value={id ? "Update" : "Add"}></input>
                        <button type="reset" className="btn iq-bg-danger">
                          Cancle
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer className="bg-white iq-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="terms-of-service.html">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 text-right">
              Copyright 2020 <a href="#">Web Spirits</a> All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UpdateLibrary;

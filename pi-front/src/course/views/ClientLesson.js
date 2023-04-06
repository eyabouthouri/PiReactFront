import axios from "axios";
import React, { useEffect, useState } from "react";
import Topnav from "../../components/Topnav";
import { toast } from "react-toastify";
import { useNavigate, Link, NavLink, useParams } from "react-router-dom";
axios.defaults.withCredentials = true;
function ClientLesson(props) {
  const { courseId } = useParams();

  const [accepted, setAccepted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [data, setData, userconnecte, setUserconnecte] = useState([]);
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);

      console.log(userconnecte, 1);
    });
    listL();
  }, []);
  console.log(userconnecte, 1);

  var history = useNavigate();

  const [state, setState] = useState({number:"",type:"",content:"", courseId});
  const userconnectee = async () => {
    const res = await axios
      .get("http://localhost:5000/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    if (res.data == []) {
      history("/");
    }
    return res.data;
  };
  const listL = async () => {
    const response = await axios.get("http://localhost:5000/lesson/listL"+courseId);
    if (response.status == 200) {
      setData(response.data);
    }
  };
  const handleAccept = () => {
    setAccepted(true);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowButton(!showButton);
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const [showPage, setShowPage] = useState(false);

  function handleaddclick() {
    setShowPage(true);
  }
  const Handelsubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="root">
      <div class="header-for-bg">
        <div class="background-header position-relative">
          <img src="images/page-img/profile-bg9.jpg" class="img-fluid w-100 rounded rounded" alt="profile-bg" />
          <div class="title-on-header">
            <div class="data-block">
              <h2>Learn and Enjoy!</h2>
            </div>
          </div>
        </div>
      </div>

      <div id="content-page" class="content-page">
        <div class="container">
          <div class="row">
            {data &&
              data.map((item, index) => {
                return (
                  <div class="col-md-6 col-lg-4">
                    <div class="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                      <div class="event-images">
                        {/* <a href="#">
                          <img class="card-img-top" src={process.env.PUBLIC_URL + "/images/" + item.img} alt="Responsive image" />
                        </a> */}
                      </div>
                      <div class="iq-card-body">
                        <div class="d-flex">
                          <div class="date-of-event">
                            <span>{}</span>
                          </div>
                          <div class="events-detail ml-3">
                            <h5>Title : {item.title}</h5>
                            <p>Description : {item.description}</p>
                            <p>Level : {item.level}</p>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="card">
                              <button class="btn btn-light">
                                <a href="/adda">
                                  <i class="bi bi-person-plus"></i> Next Lesson
                                </a>
                              </button>
                          </div>{" "}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientLesson;

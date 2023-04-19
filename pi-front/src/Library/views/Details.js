import axios from "axios";
import React, { useEffect, useState, setState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Library from "./Library";
import DetailAddCmntr from "./DetailAddCmntr";
import AffCmntr from "./AffCmntr";
import Topnav from "../../components/Topnav";
import Aff from "./Aff";
import { Store } from "react-notifications-component";
import Navbar from "../../components/Navbar";

axios.defaults.withCredentials = true;
function Details(props) {
  const { Libraryid, id } = useParams();
  const [state, setState] = useState({ description: "", Libraryid });

  const initialState = {
    name: "",
    adresse: "",
    pays: "",
    email: "",
    tel: "",
    Image: "",
  };
  const [userconnecte, setUserconnecte] = useState([]);

  const [data, setData] = useState([]);
  var history = useNavigate;
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
    });
  }, []);
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
  const listC = async () => {
    const response = await axios.get(`http://localhost:5000/commentaire/listc/${Libraryid}`);
    if (response.status == 200) {
      const newData = await Promise.all(
        response.data.map(async (comment) => {
          const user = await getuserbyid(comment.userid);
          return { ...comment, user };
        })
      );
      setData(newData);
    }
  };

  useEffect(() => {
    getOneL(Libraryid);
    listC();
  }, [Libraryid]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/commentaire/listc/${Libraryid}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [Libraryid]);

  var self = this;
  const getOneL = async (id) => {
    const response = await axios.get(`http://localhost:5000/library/getOnel/${Libraryid}`);
    setState({ ...response.data[0] });
    console.log("matba", response.data);
  };
  console.log(data.name, 3);

  const [showPage, setShowPage] = useState(false);
  const deleteC = async (id) => {
    if (window.confirm("Are u sure that u wanted to delete")) {
      const response = await axios.delete(`http://localhost:5000/commentaire/deleteC/${id}`);
      listC();
    }
  };
  const getuserbyid = async (id) => {
    const pa = await axios
      .get(`http://localhost:5000/commentaire/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    //  setpatient(res.data)
    return pa.data;
  };

  useEffect(() => {
    getuserbyid(data).then((d) => {
      setUser(d);
      console.log(user);
    });
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <Navbar className="navbar" />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="iq-edit-list-data">
              <div class="tab-content">
                <ul class="navbar-nav ml-auto navbar-list">
                  <li>
                    <a href="profile.html" class="iq-waves-effect d-flex align-items-center"></a>
                  </li>
                </ul>
                <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
                  <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                      <div class="iq-header-title">
                        <h4 class="card-title">
                          <i class="bi bi-file-earmark-person-fill"></i> Details Library
                        </h4>
                      </div>
                    </div>
                    <Aff />
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <br></br> <br></br>
                    <div class="user-img">
                      {data &&
                        data.map((item, index) => {
                          return (
                            <div class="d-flex flex-wrap">
                              <div class="user-img">
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                {item.user.username} {item.user.lastname}
                              </div>
                              <div class="comment-data-block ml-3">
                                <p>{item.description}</p>
                                <div class="d-flex flex-wrap align-items-center comment-activity">
                                  <a href="javascript:void();" onClick={() => deleteC(item._id)} onnClick={refreshPage}>
                                    delete
                                  </a>
                                  <span>{item.dateEnvoi}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      <DetailAddCmntr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

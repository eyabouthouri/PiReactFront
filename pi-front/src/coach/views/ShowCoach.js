import React, { useEffect } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
function ShowCoach(props) {
  const [user, setUser] = useState([]);
  var history = useNavigate();
  useEffect(() => {
    sednRequest().then((d) => {
      setUser(d);
    });

    let interval = setInterval(() => {
      refreshtoken();
    }, 1000 * 10000);
  }, []);

  const refreshtoken = async () => {
    const res = await axios
      .get("http://localhost:5000/users/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };
  const sednRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/users/listuser", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUser(res.data);
    return res.data;
  };

  const deleteuser = async (id) => {
    const resdelete = await axios
      .get(`http://localhost:5000/users/delete/${id}`, {
        withCredentials: true,
      })
      .then(sednRequest())
      .catch((err) => {
        console.error(err);
      });

    return resdelete.data;
  };

  return (
    <div id="content-page" class="content-page">
      <div>
        <Navbarback />
        <div>
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
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th>first Name</th>
                      <th>last name</th>
                      <th>email</th>
                      <th>username</th>
                      <th>role</th>
                      <th>image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user &&
                      user.map((item, index) => {
                        return (
                          <tr>
                            <td contenteditable="true">{item.name}</td>
                            <td contenteditable="true">{item.lastname}</td>
                            <td contenteditable="true">{item.email}</td>
                            <td contenteditable="true">{item.username}</td>
                            <td contenteditable="true">{item.role}</td>
                            <td contenteditable="true">
                              <img src={process.env.PUBLIC_URL + "/imagee/" + item.image} alt="image2" />
                            </td>

                            <td>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => deleteuser(item._id)}>
                                {" "}
                                Remove
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

export default ShowCoach;

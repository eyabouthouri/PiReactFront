import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { confirmAlert } from "react-confirm-alert";

function ShowCmntr(props) {
  const [user, setUser] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    listc();
  }, []);
  const [userconnecte, setUserconnecte] = useState([]);

  var history = useNavigate;
  useEffect(() => {
    userconnectee().then((d) => {
      setUserconnecte(d);
      console.log(userconnecte);
    });
  }, []);
  const userconnectee = async () => {
    const res = await axios
      .get("/users/userconnecte", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUserconnecte(res.data);
    if (res.data == []) {
      history("/");
    }
    return res.data;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItems = data.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const sednRequest = async () => {
    const res = await axios
      .get("/users/listuser", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    setUser(res.data);

    return res.data;
  };
  useEffect(() => {
    sednRequest().then((d) => {
      setUser(d);
      console.log(user, 2);
    });

    let interval = setInterval(() => {
      refreshtoken();
    }, 1000 * 29);
  }, []);
  const refreshtoken = async () => {
    const res = await axios
      .get("/users/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };
  const listc = async () => {
    const response = await axios.get("/commentaire/listc");
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

  const deleteC = async (id) => {
    const response = await axios.delete(`/commentaire/deleteC/${id}`);
    toast.success("comment deleteed");

    listc();
  };
  const getuserbyid = async (id) => {
    const pa = await axios
      .get(`/commentaire/getuserbyid/${id}`, {
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
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this comment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteC(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
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
                  <thead class="thead-ligh" style={{ backgroundColor: "#4d8cc4", color: "white" }}>
                    <tr>
                      <th>description</th>
                      <th>date envoi</th>
                      <th>username</th>
                      <th>Library id</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td>{item.dateEnvoi}</td>
                          <td>{item.user?.username}</td>
                          <td> {item.Libraryid}</td>

                          <td>
                            <button type="button" className="btn btn-danger " onClick={() => confirmDelete(item._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
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

export default ShowCmntr;

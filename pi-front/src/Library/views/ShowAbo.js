import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { confirmAlert } from "react-confirm-alert";

function ShowLiabrary(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    listA();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/abonnementtri");
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);
  const [triAscendant, setTriAscendant] = useState(true);
  const [user, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItems = data.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  function handleTriChange(event) {
    setTriAscendant(event.target.checked);
  }

  const listA = async () => {
    const response = await axios.get("/abonnement/lista");
    if (response.status == 200) {
      setData(response.data);
    }
  };

  const deleteA = async (id) => {
    const response = await axios.delete(`/abonnement/deletea/${id}`);
    toast.success("items deleteed");

    listA();
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this items?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteA(id),
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
                      <th>Image</th>
                      <th>First Name</th>
                      <th>Last Name </th>
                      <th>email</th>
                      <th>Tel</th>
                      <th>Duration</th>
                      <th>city</th>
                      <th>Age</th>
                      <th>Id Library</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            <img class="img-fluid img-thumbnail" src={item.image}></img>{" "}
                          </td>
                          <td class="contenteditable">{item.nom}</td>
                          <td class="contenteditable">{item.prenom}</td>
                          <td class="contenteditable">{item.email}</td>
                          <td class="contenteditable">{item.tel}</td>
                          <td class="contenteditable">{item.Duration}</td>
                          <td class="contenteditable">{item.city}</td>
                          <td class="contenteditable">{item.age}</td>
                          <td class="contenteditable">{item.Libraryid}</td>

                          <td>
                            <Link to={`/updatea/${item._id}`}>
                              <button type="button" class="btn btn-danger">
                                update
                              </button>
                            </Link>
                            <br></br>
                            <br></br>
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

export default ShowLiabrary;

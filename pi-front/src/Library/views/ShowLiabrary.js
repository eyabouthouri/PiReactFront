import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Library from "./Library";
import Pagination from "./Pagination";
import { confirmAlert } from "react-confirm-alert";

function ShowLiabrary(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    listL();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalItems = data.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const timeOut = useRef(0);
  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listL();
        } else {
          const response = await axios.get(`http://localhost:5000/library/getbynom/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 100);
  };
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const listL = async () => {
    const response = await axios.get("http://localhost:5000/library/listL");
    if (response.status == 200) {
      setData(response.data);
    }
  };

  const deleteL = async (id) => {
    const response = await axios.delete(`http://localhost:5000/library/deleteL/${id}`);
    if (response.status == 200) {
      toast.success("library deleteed");

      listL();
    }
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteL(id),
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
              </div>
            </div>

            <div class="container">
              <div class="iq-search-bar">
                <form action="#" class="searchbox">
                  <input type="text" class="text search-input" placeholder="Type here to search..." onChange={(e) => search(e.target.value)} />
                  <a class="search-link" href="#">
                    <i class="ri-search-line" />
                    <i />
                  </a>
                </form>
              </div>
              <div id="table" class="table-editable">
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-ligh" style={{ backgroundColor: "#4d8cc4", color: "white" }}>
                    <tr>
                      <th>Image</th>
                      <th>name</th>
                      <th>pays</th>
                      <th>location </th>
                      <th>email</th>
                      <th>Tel</th>
                      <th colspan="3"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            <img class="img-fluid img-thumbnail" src={process.env.PUBLIC_URL + "/images/" + item.img}></img>{" "}
                          </td>
                          <td class="contenteditable">{item.name}</td>
                          <td class="contenteditable">{item.pays}</td>
                          <td class="contenteditable">{item.location}</td>
                          <td class="contenteditable">{item.email}</td>
                          <td class="contenteditable">{item.tel}</td>
                          {console.log(item.tel, 1)}

                          <td>
                            <Link to={`/updateL/${item._id}`}>
                              <button type="button" className="btn btn-danger ">
                                update
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button type="button" className="btn btn-danger " onClick={() => confirmDelete(item._id)}>
                              Delete
                            </button>
                          </td>
                          <td>
                            <Link to={`/stat/${item._id}`}>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">
                                statistique
                              </button>
                            </Link>
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

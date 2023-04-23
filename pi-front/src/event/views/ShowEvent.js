import React, { useEffect } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
function ShowEvent(props) {
   const [event, setEvent] = useState([]);
   var history = useNavigate();
   useEffect(() => {
      sednRequest().then((d) => {
        setEvent(d);
      });
    }, []);


    const sednRequest = async () => {
      const res = await axios
        .get("http://localhost:5000/events/listev", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
        console.log(res.data)
      setEvent(res.data);
      return res.data;
    };
    const deleteev = async (id) => {
      const resdelete = await axios
        .get(`http://localhost:5000/events/deleteev/${id}`, {
          withCredentials: true,
        })
        .then(sednRequest())
        .catch((err) => {
          console.error(err);
        });
  
      return resdelete.data;
    };
    const confirmDelete = (id) => {
      confirmAlert({
        title: "Confirm delete",
        message: "Are you sure you want to delete this event?",
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteev(id),
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
                <div class="iq-header-title " >
                  <h2 class="card-title" >Events</h2>
                </div>
              </div>
            </div>
            <div class="container">
              <div id="table" class="table-editable">
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-ligh" style={{ backgroundColor: "#4d8cc4", color: "white" }}>
                    <tr>
                                    <th>title</th>
                                    <th>description</th>
                                    <th>location</th>
                                    <th>organizer</th>
                                    <th>date</th>
                                    <th>image</th>
                                    <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event &&
                      event.map((item, index) => {
                        return (
                          <tr>
                            <td contenteditable="true">{item.title}</td> 
                            <td contenteditable="true">{item.description}</td>                     
                            <td contenteditable="true">{item.location}</td>                     
                            <td contenteditable="true">{item.organizer}</td>                     
                            <td contenteditable="true">{item.date}</td>                     
                             
                            <td contentEditable={true}>
  <img id="my-image" src={process.env.PUBLIC_URL + "/imagee/" + item.img} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} />
</td>



                            <td>
                            <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => confirmDelete(item._id)}>
                                {" "}
                                Remove
                              </button>

                             <br></br> 
                              <Link to={`/Updateev/${item._id}`}>
          <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0">update</button>    
        </Link> 
                         
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


export default ShowEvent;

import { NavLink } from "react-router-dom";
import Topnav from "../../components/Topnav";
import { toast } from "react-toastify";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
const alanKey = "d13ff5f9f607b814c3e0b740da4299d42e956eca572e1d8b807a3e2338fdd0dc/stage";

function NewEv(props) {
  const currentUrl = window.location.href;
  useEffect(() => {
   
    alanBtn({
      key: alanKey,
      onCommand: (commandData) => {
        if (commandData.command === "navigateTo" && commandData.page === "/home") {
          // Navigate to the home page
          window.location.href = "/home";
        }
      },
    });
   
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    listev().then((e)=>{  setData(e);});
  }, []);
  console.log(data)
  const timeOut = useRef(0);
  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listev();
        } else {
          const response = await axios.get(`/events/rech/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 100);
  };
  const listev = async () => {
    const response = await axios.get("/events/getev");
    console.log(response)
   return  response.data

    
    
    
  };

  return (
    <div>

      
    
      <section id="team" class="">
          <div className="team">
            <div class="container-fluid">
              <div class="section-title">
              <h2>Events</h2>
          <h3>Check our <span>Events</span></h3>
                <Link class="btn btn-info " style={{ backgroundColor: "#427dcf" }} to="/allevent">
                  Check all events
                </Link>
              </div>

              <div class="row justify-content-center">
                <div class="container">
                  <div class="row">
                    {data &&
                data.map((item, index)=> {
                        return (
                          <div class="col-md-6">
                            <div class="member animated fadeInDown">
                            
            <Link to={`/eventdetails/${item._id}`}>
            <img  src={item.img} width={600} height={150} class="img-fluid" alt="image2"
                              
                              />
                                <div class="member-info">
                                <div class="member-info-content">
                                  <h4>{item.title}</h4>
                                  <span>click to participate</span>
                                </div>
                                <div class="social">
                                  <a href="">
                                    <i class="bi bi-twitter"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-facebook"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-instagram"></i>
                                  </a>
                                  <a href="">
                                    <i class="bi bi-linkedin"></i>
                                  </a>
                                </div>
                              </div>
</Link>

                            
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
       
  
      </div>
 
    


  );
}

export default NewEv;

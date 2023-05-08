import React, { useEffect } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillAudio, AiFillRest, AiFillStop } from 'react-icons/ai';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


import axios from "axios";
function ShowCoach(props) {
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState('')
  const [showCoach, setShowCoach] = useState(false);
  const [find,setfind]=useState(false);
  const [role,setrole]=useState("")


  var history = useNavigate();
  const commands = [
    {
      command: 'I would like to order *',
      callback: (order) => {
        setShowCoach(true);
      },
    },
    {
      command: 'I would like to find *',
      callback: (order) => {
        const keywords = ['coach', 'user', 'admin','is blocked'];
        let found = false;
        keywords.forEach((keyword) => {
          if (order.includes(keyword)) {
            found = true;
            setrole(keyword)
          }
        });
        if (found) {
          setfind(true);
        } else {
          console.log("Aucun des mots clés n'a été trouvé dans la commande.");
        }
      }
    },{
      command: 'Go back to *',
      callback: (order) => {
        setfind(false);
        setShowCoach(false);
      }
    }]
  // console.log(role)
    const {
     transcript,
     resetTranscript,
     browserSupportsSpeechRecognition
   } = useSpeechRecognition({ commands });
 
 console.log(showCoach)
 console.log(find)
  useEffect(()=>{
    async function fetchData() {
      const data = await sednRequest();
      return data;
    }
  
    function sortUsersByName(users) {
      return users.sort((a, b) => a.name.localeCompare(b.name));
    }
    async function filtre(users){
      if(role === "is blocked"){
        return users.filter((f)=>f.isBlocked === true)
      }
      else
       return  users.filter((f) => f.role === role);
    }
  
    async function updateUserList() {
      const userList = await fetchData();
      if (showCoach) {
        const sortedUsers = sortUsersByName(userList);
        setUser(sortedUsers);
      } else if(find) {
        const userr = await filtre(userList)
        setUser(userr);
      }else{
        setUser(userList)
      }

    }
  
    updateUserList();
 
  },[showCoach,find])

  async function search(){
   
  }
  console.log(message)
  /*const sortdata =async (data)=> {
   
    if (!data) {
      return [];
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
      
    
   }
  */
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
    console.log(res.data);
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
  const blockeduser = async (id) => {
    const resblock = await axios
      .get(`http://localhost:5000/users/blockuser/${id}`, {
        withCredentials: true,
      })
      .then(sednRequest())
      .catch((err) => {
        console.error(err);
      });

    return resblock.data;
  };
 

 
   if (!browserSupportsSpeechRecognition) {
     return <span>Browser doesn't support speech recognition.</span>;
   }
  

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
        
            <p class="text-white">lorem ipsum</p>
          </div>
          <div class="col-sm-12">
            <div class="iq-card">
            
              <div>
                 
                  <div class="iq-header-title d-flex align-items-center">
                  <h4 class="card-title">Editable Table</h4>
                 
             
                  <button class="btn btn-primary ml-auto" onClick={SpeechRecognition.startListening}> <AiFillAudio /> </button>
                  &nbsp;
                  <button class="btn btn-primary" onClick={SpeechRecognition.stopListening}> <AiFillStop></AiFillStop></button>
                  &nbsp;
                  <button class="btn btn-primary" onClick={resetTranscript}> <AiFillRest/>Reset</button>
                  <h6>{transcript}</h6>
           </div>
                
                 
           </div>
              
              
            </div>
            <div class="container">
              <div id="table" class="table-editable">
                <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead class="thead-ligh" style={{ backgroundColor: "#4d8cc4", color: "white" }}>
                    <tr>
                      <th>first Name</th>

                      <th>email</th>
                      <th>isBlocked</th>
                      <th>username</th>
                      <th>role</th>
                      <th>image</th>
                      <th>remove</th>
                      <th>block</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.map((item, index) => {
                        return (
                          <tr>
                            <td contenteditable="true">{item.name}</td>

                            <td contenteditable="true">{item.email}</td>
                            <td>{item.isBlocked.blocked.toString()}</td>
                            <td>{item.username}</td>
                            <td contenteditable="true">{item.role}</td>
                            <td contenteditable="true">
                              <img src={item.image} width={100} height={50}/>
                            </td>

                            <td>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => deleteuser(item._id)}>
                                {" "}
                                Remove
                              </button>
                            </td>
                            <td>
                              <button type="button" class="btn iq-bg-danger btn-rounded btn-sm my-0" onClick={() => blockeduser(item._id)}>
                                {" "}
                                bloquer
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

import Topnav from '../../components/Topnav';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState,useFetch } from 'react';
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import { NavLink,Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { useSpeechSynthesis } from "react-speech-kit"
import {
 Button,} from "reactstrap";
import Map from './Map';
import { useForm } from 'react-hook-form';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { FaCloudSun, FaCloudSunRain } from 'react-icons/fa';

axios.defaults.withCredentials = true;

function EventDetails(props) {



   var synth = window.speechSynthesis;
   const { speak ,pause} = useSpeechSynthesis();
   //const [event, setEvent] = useState([]);
   const [Like, setLike] = useState()
  const[nbLikes,setNblikes] =useState()
  const[usercon,setUsercon] = useState()
  const[likeee,setlikeee] = useState([])
   const { idevent } = useParams();
   const { iduser } = useParams();

   //const { idone } = useParams();

    const initialState = {  eventName:"",
    fullName:"",
    userEmail:"",
    guestSize:"",
    phone:"",
    participateAt:""};
    const [input, setinput] = useState(initialState);
const [validd, setValid] = useState(true);
const history = useNavigate();
const [msg, setmsg] = useState("");
   const [state, setState] = useState(initialState);
   const [user, setUser] = useState("");

    const [data,setData]=useState([]);
    useEffect(()=>{
      async function fetchData() {
         const event = await listoneev();
         setData(event);
       }
       fetchData()
     
   } ,[]
   )
   useEffect(() => {
      // 1. Appeler fetchData dans useEffect
      async function fetchData() {
        try {
          // 2. Appeler userconnecte avec await pour attendre la réponse
          const user = await userconnecte();
          setUsercon(user);
        } catch (error) {
          // 3. Gérer les erreurs s'il y en a
          console.error(error);
        }
      }
    
      fetchData();
    }, []);
    const userconnecte = async () => {
      const res = await axios
        .get("http://localhost:5000/users/userconnecte", {
          withCredentials: true,
        })
      return res.data;
    };
    console.log(usercon)
    useEffect(() => {
      // 1. Appeler fetchData dans useEffect
      
      async function fetch(id) {
        try {
          // 2. Appeler userconnecte avec await pour attendre la réponse
           
          const likee = await getlikeeventuser(id);
          setlikeee(likee);
        } catch (error) {
          // 3. Gérer les erreurs s'il y en a
          console.error(error);
        }
      }
      if (usercon) {
      fetch(usercon._id);}
    }, [usercon]);
    console.log(likeee)

    const getlikeeventuser = async (id) => {
      const res = await axios
        .get(`http://localhost:5000/likeEvent/getlikeeventuser/${idevent}/${id}`, {
          withCredentials: true,
        })
      return res.data;
    };
   console.log(data)

   const {
      formState: { errors, isValid }
    } = useForm({ mode: 'onBlur' });
  
  
   
  // console.log(data);
       
  const likeevent = async () => {
   try {
      if(usercon){
         await axios.post(
            `http://localhost:5000/events/likeeventt/${idevent}/${usercon._id}`,
            {
              
            },
            { withCredentials: true }
          );
         
          const likee = await getlikeeventuser(usercon._id);
          setlikeee(likee);
      }
 
      
    
   } catch (err) {
     //setValid(false);
     console.error(err);
     //setmsg(err.response.data);
   }

 };
 const dislike = async () => {
   try {
      if(usercon){
         await axios.get(
            `http://localhost:5000/events/dislikeev/${idevent}/${usercon._id}`,
            {
              
            },
            { withCredentials: true }
          );
          const likee = await getlikeeventuser(usercon._id);
          setlikeee(likee);  
      }
    
      
    
   } catch (err) {
     //setValid(false);
     console.error(err);
     //setmsg(err.response.data);
   }

 };
   const listoneev = async () => {
      const one = await axios
        .get(`http://localhost:5000/events/one/${idevent}`, {
          withCredentials: true,
        })
       
        .catch((err) => {
          console.error(err);
        });
        console.log(one.data)
      return one.data;
    };

    
    const addpart = async () => {
        try {
          const res = await axios.post(
            `http://localhost:5000/participate/aad/${idevent}`,
            {
               userId:user._id,
                //eventName: input.eventName,
                fullName: input.fullName,
                userEmail:input.userEmail,
                guestSize: input.guestSize,
                phone: input.phone,
                participateAt: input.participateAt
            },
            { withCredentials: true }
          );
          Store.addNotification({
            title: "register",
            message: "thaks for your participation",
            type: "success",
            insert: "bottom",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          history("/NewsLetter");
        } catch (err) {
          setValid(false);
          console.error(err.response.data);
          setmsg(err.response.data);
        }
      };
    
      const Handelsubmit = (e) => {
        e.preventDefault();
        addpart();
     
      };
   
      const handleInputChange = (e) => {
        let { name, value } = e.target;
        setinput({ ...input, [name]: value });
      };
    
  
       const likeeventt=async (e)=>{
         e.preventDefault();
         likeevent();
         const event = await listoneev();
         if(event){
            setData(event);
         }
         

      
       };
       const dislikee=async (e)=>{
         e.preventDefault();
         dislike();
         const event = await listoneev();
         if(event){
            setData(event);
         }
        

      
       };
       
   
    return (

        <div id="root">
          
          <Navbar></Navbar>
        <div class="header-for-bg">
         <div id="content-page" class="content-page">

            <div class="container">
               <div class="row">

                  <div class="col-md-4">
                     <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                              <h4 class="card-title">Informations</h4>
                           </div>
                        </div>
                        <div class="iq-card">

                        <div class="iq-card-body">
                        <form onSubmit={Handelsubmit} id="form-wizard1" class="text-center mt-4">
                       
                              <div class="form-group">
                                 <label for="exampleInputText1">FullName</label>
                                 <input type="text" class="form-control mb-0" name="fullName" onChange={handleInputChange} value={input.fullName} placeholder=" fullName" />
                                 {!validd && msg.fullName && <span style={{ color: "red" }}>{msg.fullName}!! </span>}

                              </div>
                              <div class="form-group">
                                 <label for="exampleInputText1">userEmail</label>
                                 <input type="text" class="form-control mb-0" name="userEmail" onChange={handleInputChange} value={input.userEmail} placeholder=" userEmail" />
                                 {!validd && msg.userEmail && <span style={{ color: "red" }}>{msg.userEmail}!! </span>}

                              </div>

                              <div class="form-group">
                                 <label for="exampleInputphone">Phone</label>
                                 <input type="text" class="form-control mb-0" name="phone" onChange={handleInputChange} value={input.phone} placeholder=" phone" />
                                 {!validd && msg.phone && <span style={{ color: "red" }}>{msg.phone}!! </span>}

                              </div>
                              <div class="form-group">
                                 <label for="exampleInputNumber1">guestSize</label>
                                 <input type="number" class="form-control mb-0" name="guestSize" onChange={handleInputChange} value={input.guestSize} placeholder=" guestSize" />
                                 {!validd && msg.guestSize && <span style={{ color: "red" }}>{msg.guestSize}!! </span>}

                              </div>

                              <div class="form-group">
                                 <label for="exampleInputdate">participateAt</label>
                                 <input type="date" class="form-control mb-0" name="participateAt" onChange={handleInputChange} value={input.participateAt} placeholder=" participateAt" />
                                 {!validd && msg.participateAt && <span style={{ color: "red" }}>{msg.participateAt}!! </span>}

                              </div>

                              <button type="submit"disabled={!isValid} class="btn btn-primary">Submit</button>
                              <button type="submit" class="btn iq-bg-danger">cancle</button>
                              
                           </form>
                        </div>
                     </div>
                     </div>
                  </div>
                  
                
                  <div class="col-md-8">
                     <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-body p-0  ">
                           <a href="#"><img src={process.env.PUBLIC_URL+"/imagee/"+data.img} class="img-fluid rounded"/></a>
                           <br></br>
          
              <br>
                            </br>
                           <div>
                            
                            <p class="card-text"><i class="bi bi-pass-fill"></i>description :{data.description} <br></br><i class="bi bi-pin-map-fill"></i>location : {data.location}  <br></br><i class="bi bi-person-fill"></i>organizer : {data.organizer} <br></br><i class="bi bi-balloon-heart-fill"></i>likes : {data.nbLikes}  </p></div>
                            {likeee.length == 0 ?(

<Button  onClick={likeeventt}color="primary"
  className="float-left">
                              
    <FaThumbsUp />
Like
</Button>

                         ):( <Button  onClick={dislikee}color="primary"
                         className="float-left">
                              
                              <FaThumbsDown /> 
                         dislikee
                         </Button>) }
                           
                            <br>
                            </br>
                         
                         
                            
                             
                          
             
                             <br>
                             
                             </br>

                            <div style={
      {
       border: '2px solid purple'
      }
    } align="left"/>
           
                            <p> <i class="bi bi-volume-up-fill"></i>Read for me </p>
                            <Button class='btn btn-primary btn-lg' className="btn-round" color="info" size="md"
       onClick={() =>synth.speak(new SpeechSynthesisUtterance(data.description))}>
                      <i class="bi bi-headphones"></i>
             </Button>
             <Button class='btn btn-primary btn-lg' className="btn-round" color="warning" size="md"
       onClick={() => synth.pause()}>
                  <i class="bi bi-pause-circle"></i>
             </Button>
             <Button class='btn btn-primary btn-lg' className="btn-round" color="success" size="md"
       onClick={() => synth.resume()}>
                      <i class="bi bi-fast-forward-circle"></i>
         
             </Button>
             <Button class='btn btn-primary btn-lg' className="btn-round" color="danger" size="md"
       onClick={() => synth.cancel()}>
<i class="bi bi-power"></i>           
             </Button>
             <p><FaCloudSunRain /> Check Weather</p>
      <Button color="dark">
        <FaCloudSun /> <NavLink to={`/tasks`}>Check Weather</NavLink>
      </Button>
        
             </div>
                     </div>
             
                  </div>
                

                  <div class="col-sm-12">
                     <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-header d-flex justify-content-between">
                           <div class="iq-header-title">
                           
                           <h3 class="mt-4 mb-1"></h3>
                           
                        
                           </div>
                           <div>
                           
                           </div>

                           </div>                  </div>                 </div>           </div>
 </div>
</div>

 </div>
 <div>
   <div>
   <Map/>

   </div>

         <br></br>  <br></br>   <br></br>         <br></br><br></br>
      <footer class="bg-white iq-footer">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-6">
                     <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li class="list-inline-item"><a href="terms-of-service.html">Terms of Use</a></li>
                     </ul>
                  </div>
                  <div class="col-lg-6 text-right">
                     Copyright 2020 <a href="#">
                        Web Spirits</a> All Rights Reserved.
                  </div>
               </div>
            </div>
         </footer>
            
    
    
   </div>
 </div>
 
    );
}

export default EventDetails;
import Library from './Library';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';
import { Link, useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import AffCmntr from './AffCmntr';
axios.defaults.withCredentials = true;

function DetailAddCmntr(props) {
   const { Libraryid ,id} = useParams();
   const [state, setState] = useState({  
      description:"",
      Libraryid, 
  
   });
   const [data,setData,userconnecte, setUserconnecte]=useState([]);
   const [msg, setmsg] = useState({});
    const [valid, setValid] = useState(true);
   const [comments, setComments] = useState([]);
   const listC = async()=>{
      const response = await axios.get(`http://localhost:5000/commentaire/listc/${Libraryid}`);
      if (response.status == 200) {
          console.log("aaaaaaaaaaa", response.data);
          setData(response.data);
        }
      };
   const addC = async (data) => {
      try{
      const response = await axios.post("http://localhost:5000/commentaire/addc",data,
      { withCredentials: true }).then(
         listC()

     ) }
      catch (err) {
        setValid(false);
        console.error(err.response.data);
        setmsg(err.response.data);
  
      }
  
    };


   const handleInputChange = (e) => {
      let{name, value}=e.target;
      setState({...state, [name]:value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      addC(state).then((newComment) => {
         setComments([...comments, newComment]);
         setState({ ...state, description: "" }); // clear the input field
      });
      listC();

   };

   useEffect(() => {
      axios.get(`http://localhost:5000/commentaire/listc/${Libraryid}`)
         .then((response) => {
            setComments(response.data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [Libraryid]);

   return (
      <div id="root">
                  {!valid && msg.description && <span style={{ color: "red" }}>{msg.description}!! </span>}

         <form class="comment-text d-flex align-items-center mt-3" method="POST" onSubmit={handleSubmit}>                     
            <input type="text" class="form-control rounded" name="description" placeholder="commenter" onChange={handleInputChange} value={state.description} />
            <div class="comment-attagement d-flex">
               <a href="javascript:void();"><i class="ri-link mr-3"></i></a>
               <a href="javascript:void();"><i class="ri-user-smile-line mr-3"></i></a>
               <a href="javascript:void();"><i class="ri-camera-line mr-3"></i></a>
            </div>
         </form> 

      </div>
   );
}

export default DetailAddCmntr;

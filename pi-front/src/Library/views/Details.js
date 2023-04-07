import axios from 'axios';
import React, { useEffect, useState,setState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Library from './Library';
import DetailAddCmntr from './DetailAddCmntr'
import AffCmntr from './AffCmntr';
import Topnav from '../../components/Topnav';
import Aff from './Aff';
axios.defaults.withCredentials = true;
function Details(props) {
    const { Libraryid ,id} = useParams();
    const [state, setState]=useState({  description:"",Libraryid, name:"",
    adresse:"",
    pays:"",
    email:"",
    tel:"",
   Image:""
})

const initialState= {
    name:"",
    adresse:"",
    pays:"",
    email:"",
    tel:"",
   Image:""
 }

 const listC = async()=>{
    const response = await axios.get(`http://localhost:5000/commentaire/listc/${Libraryid}`);
    if (response.status == 200) {
        console.log("aaaaaaaaaaa", response.data);
        setData(response.data);
      }
    };
   
    const [data,setData,userconnecte, setUserconnecte]=useState([]);
    useEffect(() =>{
       
        getOneL(Libraryid);
            listC();
     
     },[Libraryid])    
  var self=this;
     const getOneL = async (id) => {
        const response = await axios.get(`http://localhost:5000/library/getOnel/${Libraryid}`);
           setState({ ...response.data[0]} );
           console.log("matba", response.data);

  
        
     };
     console.log(data.name,3)
     const addC = async (data)=> {
        const response = await axios.post("http://localhost:5000/commentaire/addc",data,
        {withCredentials: true}).then(
    
       
       )
       .catch((err)=>{
          console.error(err)
          console.log(err)
    
        }
       );
       return response.data;
    
     }
     const  handleInputChange=(e) =>{
        let{name, value}=e.target;
        setState({...state, [name]:value });
     };
     const [showPage, setShowPage] = useState(false);
     const deleteC = async (id)=> {
      
        const response = await axios.delete(`http://localhost:5000/commentaire/deleteC/${id}`,
        {withCredentials: true}).then(
           listC()
  
        
        )
        .catch((err)=>{
           console.error(err)
           
  
         }
        );
        return response.data;

  

  }     

 
 
  function refreshPage() {
     window.location.reload(false);
   }
    

     function handleaddclick() {
        setShowPage(true);
      }
      const Handelsubmit=(e)=>{
                
         e.preventDefault();
        
            addC(state);
      
      
       
      };
  
      
    return (
        <div id="root">
                        <Topnav/>

                        <div class="header-for-bg">
     <div id="content-page" class="content-page">
        <div class="container">
           <div class="row">

            
              <div class="col-md-8">
                 <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div class="iq-card-body p-0  ">
                       <div class="col-sm-6">
                  <div class="card">
                     <div class="card-body">
            
                            <Aff/>           

      <div class="user-img">
      {data && data.map((item, index)=>{
         return(
            <div class="d-flex flex-wrap">
            <div class="user-img">
               <h7>  Eya bouthouri</h7>
            </div>
            <div class="comment-data-block ml-3">
              
      <p>{item.description}</p>
      <div class="d-flex flex-wrap align-items-center comment-activity">

         
      <a href="javascript:void();" onClick={() => deleteC(item._id)} onnClick={refreshPage}>delete</a>
         <a href="javascript:void();">translate</a>
         <span>{item.dateEnvoi}</span>
         </div></div>

</div>
         )
    } )}     
    </div> 

   </div></div></div>
   <DetailAddCmntr/>

   </div></div></div></div></div></div></div>
    
      
         </div>

    );
}

export default Details;
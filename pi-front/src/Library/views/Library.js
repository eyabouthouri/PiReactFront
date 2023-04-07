import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Topnav from '../../components/Topnav';
import {toast} from "react-toastify";
import { useNavigate,Link,NavLink, useParams } from 'react-router-dom';
import AffCmntr from './AffCmntr';
import Addabonnement from './Addabonnement';
import ShowLiabrary from './ShowLiabrary';
import Details from './Details';
axios.defaults.withCredentials = true;



function Library(props) {

   const [accepted, setAccepted] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
   const [showButton, setShowButton] = useState(false);
   const [data,setData,userconnecte, setUserconnecte]=useState([]);
useEffect(()=>{
   userconnectee().then((d) => {

      setUserconnecte(d);

      console.log(userconnecte,1)
    
   });
   listL();

},[])
console.log(userconnecte,1)
const { Libraryid } = useParams();

var history=useNavigate()

const initialState= {
   description:"",
   Libraryid

}
const [state, setState] = useState(initialState);
const { description}=initialState;
const addC = async (data)=> {
    const response = await axios.post("http://localhost:5000/commentaire/addc",data,
    {withCredentials: true}).then(
      listL()

   
   )
   .catch((err)=>{
      console.error(err)
      

    }
   );
   return response.data;

 }
 const userconnectee = async()=>{

   const res = await axios
   .get("http://localhost:5000/users/userconnecte", {
     withCredentials: true,

   })
   .catch((err) => console.log(err));
   setUserconnecte(res.data)
   if(res.data == [])
   {
      history("/")

   }
   return res.data;
}
const listL = async()=>{
const response = await axios.get("http://localhost:5000/library/listL");
if(response.status ==200){
   setData(response.data);
}
}
const handleAccept = () => {
    
   setAccepted(true);
 }
 const handleCheckboxChange = () => {
   setIsChecked(!isChecked);
   setShowButton(!showButton);
 };
const listC = async()=>{
   const response = await axios.get("http://localhost:5000/commentaire/listc"+Libraryid);
   if(response.status ==200){
      setData(response.data);
   }
   }
const  handleInputChange=(e) =>{
   let{name, value}=e.target;
   setState({...state, [name]:value });
};
const [showPage, setShowPage] = useState(false);

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
            <div class="background-header position-relative">
               <img src="images/okok.jpg" width="20px" height="20px"class="img-fluid rounded w-100 rounded rounded"  alt="profile-bg"/>
               <div class="title-on-header">
                  <div class="data-block">
                     <h2>Library</h2>

                  </div>
               </div>
            </div>
         
            <div   class="container">
            <div class="row">

               {data && data.map((item, index)=>{
               return(
                  <div class="col-sm-6">
                  <div class="card">
                     <div class="card-body">

                  <img class="card-img-top"  src={process.env.PUBLIC_URL+"/images/"+item.img}></img>
                     <div class="card-body">
                     <h2 class="p1" >{item.name}</h2>
                        <p class="l1"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
  <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
</svg>
  Adresse : {item.adresse} <br></br>  

  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open-fill" viewBox="0 0 16 16">
  <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765l-6-3.2ZM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516ZM0 13.373l5.693-3.163L0 6.873v6.5Z"/>
</svg> email : {item.email} <br></br>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-europe-africa" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"/>
</svg>Pays : {item.pays}   <br></br>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-inbound-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"/>
</svg>      Tel : {item.tel}   </p>
          
                  <br></br> <br></br><br></br>
                  <div class="row">

                  <div class="col-sm-6">
    <div class="card">
    <div class="card-body">

 <div class="btn-group-toggle" data-toggle="buttons">
 <Link to={`/det/${item._id}`}>

  <label  class="btn btn-info">
               <i class="bi bi-chat-dots"></i> commenter
 </label> </Link>

 <br></br> <br></br>
      {isChecked &&  <AffCmntr/>}
    </div> </div></div></div>
    <div class="col-sm-6">
    <div class="card">
    <div class="card-body">
    <Link to={`/adda/${item._id}`}>
                                <button type="button" class="btn btn-light"><i class="bi bi-person-plus"></i> 
                                  abonnement
                                </button>
                              </Link></div>
                             
                              <div class="card-body">
  </div>
  </div>    </div>  </div>
 
                                   <br></br>                
                        <div class="d-flex flex-wrap">
                     <ul class="post-comments p-0 m-0">
                                                   <li class="mb-2">
                                                      <div class="d-flex flex-wrap">
                                                          </div>
                                                   </li>
                                                </ul>
</div>          
                        </div>  </div>        
                        </div>
                                       
                        <br></br>


                     </div>   )                           
                              })}  

                     </div>              
                     </div>
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
         
   );
}

export default Library;
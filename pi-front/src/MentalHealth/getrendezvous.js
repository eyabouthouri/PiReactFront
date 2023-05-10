
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarback from '../components/Navbarback';
import SideBar from '../components/SideBar';
import NavbarFront from '../components/NavbarFront';
import Navbar from '../components/Navbar';
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
const { userexisting } = useSelector((state) => state.session);
axios.defaults.withCredentials = true;

function GetRdv(props){
   
    const [rdv,setrdv]= useState([]);
    const [userco, setUserco] = useState([]);
    const [details, setdatails] = useState([]);
    const [patient,setpatient] = useState([])
    
 
    useEffect(() => {
      setUserco(userexisting);
    }, []);
  
    useEffect(() => {
      async function fetchRdv() {
        if (userco._id !== undefined) {
          const rdvData = await getrdv(userco._id);
          setrdv(rdvData);
        }
      }
  
      fetchRdv();
    }, [userco._id]);
   
    
  
   
  
    const userconnecteee = async () => {
      const res = await axios.get("/users/userconnecte", {
        withCredentials: true,
      }).catch((err) => console.log(err));
      return res.data;
    };
  
    const getrdv = async (idcon) => {
      const res = await axios.get(`/coach/getallrdvbycoach/${idcon}`, {
        withCredentials: true,
      }).catch((err) => console.log(err));
      return res.data;
    };
    const getuserbyid = async(id)=>{
       const pa = await axios.get(`/coach/getuserbyid/${id}`, {
        withCredentials: true,
      }).catch((err) => console.log(err));
    //  setpatient(res.data)
      return pa.data;
    }
    const deleterdv = async(id)=>{
      const pa = await axios.get(`/coach/deleterdv/${id}`, {
        withCredentials: true,
      }).catch((err) => console.log(err));
    }

    const refresh = async(id)=>{
      deleterdv(id);
      const rdvData = await getrdv(userco._id);
      setrdv(rdvData);
    }
    const confirmDelete = (id) => {
      confirmAlert({
       
        message: "Are you sure you want to delete this appointment ?",
        buttons: [
          {
            label: "Yes",
            onClick: () => refresh(id),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    };
  
    function HandleEventClick(event){
       
  
      console.log(event.event.extendedProps)
      setdatails(event.event.extendedProps)
      async function getuserid() {
    
          const p = await getuserbyid(event.event.extendedProps.patientid)
          setpatient(p)
      
      }
      getuserid();
     
      
    }
     console.log(rdv)
     console.log(details)
     function RenderEventContent(event) {
      let etaat=false;
      console.log(event.event.extendedProps.etat)
      if(event.event.extendedProps.etat==="annulée")
      {
        etaat=true
      }
    
      
    
     const afficherBouton = (
      etaat && (
        <button type="button" className="btn btn-danger" onClick={() => confirmDelete(event.event.extendedProps._id)}>
          Remove
        </button>
      )
    );
  
      return (
      
           <div>
           <b>{event.event.start.toLocaleTimeString( [],{ hour: "2-digit", minute: "2-digit" })}</b>
    
          <i>{event.event.extendedProps.etat}</i> 
        <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModall">
      show More Details  
    </button>
    {afficherBouton}
    
   
    
    
    
        </div>
        <br></br>
        <div>
       
        </div>
    
          </div>
    
    
    
      )
    
    }

    return(
    <div>
       <Navbar></Navbar>
       <br></br>
     <br></br>
     <br></br>
        <div class="row">
        <div class="col-sm-12">
        <div class="">
       
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={rdv}
        //events={events}
        eventContent={RenderEventContent}
        eventClick={HandleEventClick} 
        
      />
</div>

</div>
</div>
<div class="modal fade" id="exampleModall" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">detail des rendez-vous</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="user-data-block">
        
             <h6 class="">   Nom patient </h6> 
             <p>{patient.name} </p>
              <h6 class="">   Prenom patient </h6> 
              <p>{patient.lastname}</p>
             <h6  class="">Email patient</h6>
             <p>{patient.email}</p>
             <h6  class="">Telephone patient</h6>
            <p>{details.tel}</p>

            <h6>Rendez-vous {details.etat}</h6>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
    )
  
}

 

export default GetRdv

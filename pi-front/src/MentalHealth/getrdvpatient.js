
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarFront from '../components/NavbarFront';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../components/Navbar';
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;
function GetrdvPatient(){
  
const { userexisting } = useSelector((state) => state.session);
    const [rdvpatient,setrdvpatient]= useState([]);
    const [patientco, setpatientco] = useState(userexisting);
    const[startdate,setstartdate]=useState();
    const [holidays,setholidays] = useState([]);
    const[mintime,setmintime]=useState(new Date());
    const[idavis,setidavis]=useState();
  const[exclusedtimee,setexclusedtimee]=useState([])
  const[inputcoach,setinputcoach]=useState({datee:null});
  const[idd,setid]=useState();
  
  axios.defaults.withCredentials = true;
    useEffect(() => {
       /* async function fetchData() {
          const user = await userconnecteee();
          setpatientco(user);
          setstartdate(new Date())
        }*/

     // setpatientco(userexisting);
       
      }, []);
    
      useEffect(() => {
        async function fetchRdv() {
          if (patientco._id !== undefined) {
            const rdvData = await getrdv(patientco._id);
            console.log(rdvData)
            setrdvpatient(rdvData);
          }
        }
    
        fetchRdv();
      }, [patientco?._id]);
      console.log(rdvpatient)
      const userconnecteee = async () => {
        const res = await axios.get("/users/userconnecte", {
          withCredentials: true,
        }).catch((err) => console.log(err));
        return res.data;
      };

    

    const getrdv = async (idcon) => {
        const res = await axios.get(`/coach/getrendezvousbypatient/${idcon}`, {
          withCredentials: true,
        }).catch((err) => console.log(err));
        return res.data;
      };
      const annulerrdv = async (id)=>{
        try {
            const res= await axios.put(`/coach/annulerrdv/${id}`, {
              withCredentials: true,
            });
           // console.log(patientco._id)
          // await getrdv(patientco._id); 
          } catch (err) {
            console.log(err);
          }
      }
      
      const refresh = async(id)=>{
         annulerrdv(id);
        const rdvData = await getrdv(patientco?._id);
        console.log(rdvData)
        setrdvpatient(rdvData);
      }
      const confirmannuler = (id) => {
        confirmAlert({
         
          message: "Are you sure you want to cancel this appointment ?",
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
      const addresndezvous = async()=>{
        
        await axios.put(`/coach/updaterdv/${idavis}`,{
     
       date:inputcoach.datee,
       
       
    },{withCredentials: true}).catch(
     (err)=>{
        console.error(err)}
    )
      }
      const getrendezvous = async(id)=>{
        const rendezvous=await axios.get(`/coach/getrdvbycoach/${id}`,{
          withCredentials: true,
        })
        console.log(rendezvous.data)
      //  setholidays(rendezvous.data)
        
       // console.log(holidays)
       
       return rendezvous.data
  
  
      }
    
    const  handleInputChange=(e) =>{
     console.log(e)
      setinputcoach({...inputcoach,datee:e});
      if(e.getDate() > new Date().getDate()){
        setmintime(new Date().setHours(9,0,0))
      }
      else if(e.getDate() === new Date().getDate()){
       if( new Date().getHours()>new Date(9,0,0,0).getHours())
        setmintime(new Date())
      }
     
      setexclusedtimee(
        holidays.filter((holiday) => {
          return new Date(holiday.date).getDate() === e.getDate();
        }).map((value) => {
          return new Date(value.date);
        })
      )
    
  
    // console.log(e)
     
      
  
     
  
    
   };
   
   const  handleDateSelect=(e) =>{
    setstartdate(e)
   //console.log(e.getDate()) 
   
    
   };
 
   const Handelsubmit=async(e)=>{
            
     e.preventDefault();
  

     addresndezvous();
        const rdvData = await getrdv(patientco?._id);
        setrdvpatient(rdvData);
     
  
  
  };
  const updaterdv=(e,i)=>{
    console.log(i);
    console.log(e)
    setidavis(e);
    getrendezvous(i).then((obj,err)=>{
      if(err){console.error(err)}
      else
        {setholidays(obj);
        
        
        
        }
  
     })
     console.log(holidays)
  }
  console.log(holidays)
  console.log(idd)
  

      function RenderEventContent(event) {

        return (
        
             <div>
             <b>{event.event.start.toLocaleTimeString( [],{ hour: "2-digit", minute: "2-digit" })}</b>

             
                
          <div>
        
          <button type="button" class="btn btn-danger" onClick={()=>{confirmannuler(event.event.extendedProps._id)}} >
          <i class="fa fa-times-circle"></i>
            annuler 
      </button>
      <button type="button" class="btn btn-warning" data-toggle="modal"  data-target="#exampleModal2" onClick={()=>{updaterdv(event.event.extendedProps._id,event.event.extendedProps.userid)}}>
      <i class="fa fa-refresh"></i>    changer la date 
      </button>
      
      
      
          </div>
      
            </div>
      
      
      
        )
      
      }

return    (
    <div>
     <Navbar></Navbar>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
         <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        eventContent={RenderEventContent}
        events={rdvpatient}
        height='700px' // définir la hauteur à 500 pixels
        aspectRatio={2} // définir un rapport de 2:1 entre la largeur et la hauteur
        style={{ border: '2px solid #ccc !important', borderRadius: '10px' }}
     // ajouter une bordure décorative
        
      />
       <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel2">Prendre un   Rendez Vous</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
     
       <form onSubmit={Handelsubmit}>

       <DatePicker
       className="form-control"
       selected={startdate}
        name="datee"
       value={inputcoach.datee}
       onSelect={handleDateSelect}
       onChange={handleInputChange}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="yyyy/MM/dd"
       
        maxTime={new Date().setHours(17,0,0)}
        minDate={new Date()}
        minTime={mintime}
        excludeTimes={exclusedtimee}
     
      // dateFormat="dd/MM/yyyy" 
      //excludeTimes={holidays.map((value,key) => new Date(value.date))}
      
  
      
       //excludeTimes={}
       


      
  />
 
 
  
    
  
         <div class="modal-footer">
   
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
       
    </form>

      </div>
    
    </div>
  </div>
</div>

    </div>
)
}

export default GetrdvPatient

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarFront from '../components/NavbarFront';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
axios.defaults.withCredentials = true;
function GetrdvPatient(){
    const [rdvpatient,setrdvpatient]= useState([]);
    const [patientco, setpatientco] = useState([]);
    const[startdate,setstartdate]=useState();
    const [holidays,setholidays] = useState([]);
    const[mintime,setmintime]=useState(new Date());
    const[idavis,setidavis]=useState();
  const[exclusedtimee,setexclusedtimee]=useState([])
  const[inputcoach,setinputcoach]=useState({datee:null});
  const[idd,setid]=useState();
  axios.defaults.withCredentials = true;
    useEffect(() => {
        async function fetchData() {
          const user = await userconnecteee();
          setpatientco(user);
          setstartdate(new Date())
        }
    
        fetchData();
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
      }, [patientco._id]);
      console.log(rdvpatient)
      const userconnecteee = async () => {
        const res = await axios.get("http://localhost:5000/users/userconnecte", {
          withCredentials: true,
        }).catch((err) => console.log(err));
        return res.data;
      };
    

    const getrdv = async (idcon) => {
        const res = await axios.get(`http://localhost:5000/coach/getrendezvousbypatient/${idcon}`, {
          withCredentials: true,
        }).catch((err) => console.log(err));
        return res.data;
      };
      const annulerrdv = async (id)=>{
        try {
            const res= await axios.put(`http://localhost:5000/coach/annulerrdv/${id}`, {
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
        const rdvData = await getrdv(patientco._id);
        console.log(rdvData)
        setrdvpatient(rdvData);
      }
      const addresndezvous = async()=>{
        
        await axios.put(`http://localhost:5000/coach/updaterdv/${idavis}`,{
     
       date:inputcoach.datee,
       
       
    },{withCredentials: true}).catch(
     (err)=>{
        console.error(err)}
    )
      }
      const getrendezvous = async(id)=>{
        const rendezvous=await axios.get(`http://localhost:5000/coach/getrdvbycoach/${id}`,{
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
        const rdvData = await getrdv(patientco._id);
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
  

      function RenderEventContent(event) {

        return (
        
             <div>
             <b>{event.event.start.toLocaleTimeString( [],{ hour: "2-digit", minute: "2-digit" })}</b>
             
          
          <div>
          <button type="button" class="btn btn-danger" onClick={()=>{refresh(event.event.extendedProps._id)}} >
            annuler 
      </button>
      <button type="button" class="btn btn-warning" data-toggle="modal"  data-target="#exampleModal2" onClick={()=>{updaterdv(event.event.extendedProps._id,event.event.extendedProps.userid)}}>
            changer la date 
      </button>
      
      
      
          </div>
      
            </div>
      
      
      
        )
      
      }

return    (
    <div>
        <NavbarFront></NavbarFront>
         <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        eventContent={RenderEventContent}
        events={rdvpatient}
      
        
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
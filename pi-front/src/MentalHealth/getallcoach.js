import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarback from "../components/Navbarback"
import NavbarFront from "../components/NavbarFront";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import { Rating} from 'react-simple-star-rating';
import ReactStars from "react-stars";
axios.defaults.withCredentials = true;

function GetallCoach(){
   
    const [user, setUser] = useState([]);
    const[startdate,setstartdate]=useState();
    const[inputcoach,setinputcoach]=useState({datee:null,userid:null,patientid:null,tel:null});
    const [usercon, setUsercon] = useState();
    const[idd,setid]=useState();
    const [holidays,setholidays] = useState([]);
    const[mintime,setmintime]=useState(new Date());
  const[exclusedtimee,setexclusedtimee]=useState([])
  const [rating, setRating] = useState()
  const[coach,setcoach]=useState();
  const[userco,setUserco] = useState()

  
  
    const [value, setValue] = useState(new Date());
   
    var history = useNavigate();
    useEffect(()=>{

      async function fetchData() {
        const user = await userconnecte();
        setUsercon(user);
        
      }
  
      fetchData();
    
      /*
      userconnecte().then((u) => {
         setUsercon(u);
         console.log(usercon);
       });*/
    },[])
   
    useEffect(() => {
      setstartdate(new Date())
      sednRequest().then((d) => {
        setUser(d);
      });

      console.log(user)
     
      

      
  
      let interval = setInterval(() => {
        refreshtoken();
      }, 1000 * 10000);
    }, []);

    console.log(usercon)
    const refreshtoken = async () => {
      const res = await axios
        .get("http://localhost:5000/users/refresh", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
    };
    const userconnecte = async () => {
      const res = await axios
        .get("http://localhost:5000/users/userconnecte", {
          withCredentials: true,
        })
      return res.data;
    };
   
    const sednRequest = async () => {
      const res = await axios
        .get("http://localhost:5000/coach/getallcoach", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
        console.log(res.data)
      setUser(res.data);
      return res.data;
    };
   
    
    const addresndezvous = async(id)=>{
      console.log(usercon._id)
      const ress = await axios.post(`http://localhost:5000/coach/addrendezvous/${id}`,{
   
     date:inputcoach.datee,
     userid:id,
     tel:inputcoach.tel,
     patientid:usercon._id
     
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
      setholidays(rendezvous.data)
      
      console.log(holidays)
     
     return rendezvous.data


    }
    const getcoachdetails = async(id)=>{
      const coach=await axios.get(`http://localhost:5000/coach/getuserbyid/${id}`,{
        withCredentials: true,
      })
      console.log(coach.data)
      
      
    
     
     return coach.data


    }
    console.log()
  
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
const handleInputChangetel=(e)=>{
setinputcoach({...inputcoach,tel:e.target.value})
}
 console.log(inputcoach.datee)
 const Handelsubmit=(e)=>{
          
   e.preventDefault();
 
   addresndezvous(idd);
   


};


 const handelsubmitt=(idcoach)=>{
   setid(idcoach);
  getrendezvous(idcoach).then((obj,err)=>{
    if(err){console.error(err)}
    else
      {setholidays(obj);
      
      
      
      }

   })
 getcoachdetails(idcoach).then((obj,err)=>{
    setcoach(obj)
   })


   console.log(holidays)
 console.log(coach)
 

 }
 const addavis =async(id,rating)=>{
 const ress = await axios.post(`http://localhost:5000/coach/addavis`,{
   
     nbravis:rating,
     idcoch:id,
     idpa:usercon._id})
 }
 const updateavis =async(value)=>{
  const ress = await axios.put(`http://localhost:5000/coach/updateavis/${idd}/${usercon._id}`,{
    
      nbravis:value
     }).catch((err)=>console.log(err))
    console.log(value)
  }
 


 const handleRating = (id,value) => {
   setUserco(id)
 setRating(value)
  // other logic
  addavis(id,value)
  sednRequest().then((d) => {
    setUser(d);
  });


}
const handleRatingupdate = (value) => {
  
//setRating(value)
 // other logic
 console.log(value)
  updateavis(value);
 ;
 sednRequest().then((d) => {
  setUser(d);
});


}
console.log(userco)
console.log(rating)

// Optinal callback functions




    return(
      <>
      
        <div>
        <NavbarFront></NavbarFront>
           <div class=" d-flex justify-content-center align-items-center">
            <div class="background-header position-relative">
               <img src="images/page-img/he.png" width="1500" height="400" alt="header-bg"/>
             
            </div>
         </div>

           <div id="content-page" class="content-page">
            <div class="container">
               <div class="row">
               {user &&
                      user.map((item, index) => {
                        return (
                  <div class="col-md-6">
                     <div class="iq-card">
                        <div class="iq-card-body profile-page p-0">
                           <div class="profile-header-image">
                              <div class="cover-container">
                              <img src="images/page-img/profile-bg8.jpg" alt="profile-bg" class="rounded img-fluid w-100"/>
                                 
                              </div>
                              <div class="profile-info p-4">
                                 <div class="user-detail">
                                    <div class="d-flex flex-wrap justify-content-between align-items-start">
                                       <div class="profile-detail d-flex">
                                          <div class="profile-img pr-4">
                                          <img src={process.env.PUBLIC_URL + "/imagee/" + item.image} alt="image2" />

                                          </div>
                                          <div class="user-data-block">
                                             <h4 class="">{item.name} {item.lastname}</h4>
                                             <h6>specialite : {item.specialite}</h6>
                                             <h6>telephone : {item.telephone}</h6>
                                             <h6>adresse : {item.adresseCabinet}</h6>
                                             <p>{item.biographie}</p>

                                             <p>
                                             {item.avis && Array.isArray(item.avis) ? (
                                              (() => {
                                                        let sum = 0;
                                                        let i=0;
                                                        item.avis.map((value, index) => {
                                                          i=i+1
                                                          sum += value.nbravis;
                                                      
                                                        });
                                                        return <ReactStars 
                                          
                                                       
                                                        isHalf={true}
                                                        size={50}
                                                        value={sum/i}
                                                        edit={false}
                                                        precision={0.1}
                                                       >
                                                        
                                                      </ReactStars>
                                                           
                                                      })()):(
                                                        <ReactStars 
                                          
                                                      
                                                        isHalf={true}
                                                        size={50}
                                                        value={0}
                                                        edit={false}
                                                        precision={0.1}
                                                       >
                                                        
                                                      </ReactStars>
                                                      )}</p>
                                           
                                           
                                        
                                           
                                            
                                         
                                           
                                          </div>
                                          <div className='App'>
     
    </div>
                                       </div>
                                       
                                       
                                      
                                       <button type="button" class="btn btn-primary" data-toggle="modal"  data-target="#exampleModal2"  onClick={() =>handelsubmitt(item._id)}>rende vous </button>
                                       {(() => {
    let etatavis = true;
    let updateavis = false;
    let id = "";
    
    item.avis.map((value, index) => {
      
      if(usercon){
        id=usercon._id
      }
      if (value.idpatientavis ===id) {
        etatavis = false;
        updateavis=true
      }
    });
    
    return (
      <div>
        {etatavis && (
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handelsubmitt(item._id)}>
            Donner une note
          </button>
        )}
        {updateavis && (
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterupdate" onClick={() => handelsubmitt(item._id)}>
           changer votre avis
          </button>
        )

        }
      </div>
    );
  })()}
         
                                    </div>
                                            
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                        )
                      })}
               </div>
            </div>
           
         </div>   
  
        </div>
        

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
 
     
      {
                          (coach)&&(
                 
      <div class="modal-body">
      <div class="user-data-block">
      <div class="form-group row align-items-center">
                          <div class="col-md-12">
                      
                              <img class="profile-pic" src={process.env.PUBLIC_URL + "/imagee/" + coach.image} alt="profile-pic" />
                              
                              <Rating
                                           
                                           
                                           onClick={(value) => handleRating(idd, value)}/>
                                        
                           
                            </div>
                          </div>
                        </div>
             <h6 class="">   Nom coach </h6> 
             <p>{coach.name} </p>
              <h6 class="">   Prenom coach </h6> 
              <p>{coach.lastname}</p>
             <h6  class="">tel coach</h6>
             <p>{coach.telephone}</p>
             <h6  class="">specialite </h6>
            <p>{coach.specialite}</p>


           
            
      </div>

)
}
     
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalCenterupdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="">
                        {
                          (coach)&&(
                 
      <div class="modal-body">
      <div class="user-data-block">
      <div class="form-group row align-items-center">
                          <div class="col-md-12">
                      
                              <img class="profile-pic" src={process.env.PUBLIC_URL + "/imagee/" + coach.image} alt="profile-pic" />
                              
      <Rating
                                           
                                           
                                           onClick={(value)=>{handleRatingupdate(value)}}/>
                           
                            </div>
                          </div>
                        </div>
             <h6 class="">   Nom coach </h6> 
             <p>{coach.name} </p>
              <h6 class="">   Prenom coach </h6> 
              <p>{coach.lastname}</p>
             <h6  class="">tel coach</h6>
             <p>{coach.telephone}</p>
             <h6  class="">specialite </h6>
            <p>{coach.specialite}</p>


           
            
      </div>

)
}
      </div>
     
    </div>
  </div>
</div>
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel2">Prendre un   Rendez Vous</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
     
       <form onSubmit={Handelsubmit}>

       <input type="text" class="form-control" name="tel" onChange={handleInputChangetel} value={inputcoach.tel} placeholder="telephone"  />   
       <br></br>
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
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
       
    </form>

      </div>
    
    </div>
  </div>
</div>

        </>
        
    )
}
export default GetallCoach
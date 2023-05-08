import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/getcoachclient");
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(onlineUsers);

  }, [friends, onlineUsers]);
   console.log(onlineFriends)
const ajouterconv = async(usere)=>{
  try {
    const res = await axios.post(
      `/conversation/${currentId}/${usere._id}`
    );
    console.log(res) 
    if(res){
      const ress = await axios.get(
        `/conversation/find/${currentId}/${usere._id}`
      );
    }
    
    setCurrentChat(res.data);
  } catch (err) {

    console.log(err);
  }
}
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      
        // Si la conversation n'existe pas encore, on l'ajoute
        await ajouterconv(user)
        // On affiche ensuite la conversation nouvellement créée
        
     
    }
  };
console.log(friends)
  return (

    <div>
  
   
  <div>

  <div class="right-sidebar-mini right-sidebar">
            <div class="right-sidebar-panel p-0  ">
               <div class="iq-card shadow-none">
                  <div class="iq-card-body p-0">
                     <div class="media-height p-3">
                       
                        {onlineFriends.map((o) => (
                         <div class="media align-items-center mb-4">
                           <div class="iq-profile-avatar status-online">
          
                              <img class="rounded-circle avatar-50" src={o.image} alt=""/>
                           </div>
                           <div class="media-body ml-3">
                              <h6 class="mb-0"><a href="#" onClick={() => handleClick(o)}>{o?.name} {o?.lastname}</a></h6>
                              <p class="mb-0">{o.role}</p>
                           </div>
                          
                        </div>
                       
                        ))}
                          {friends.filter((f)=>f.id != currentId).map((f) =>(
                         <div class="media align-items-center mb-4">
                           <div class="">
          
                              <img class="rounded-circle avatar-50" src={f.image} alt=""/>
                           </div>
                           <div class="media-body ml-3">
                              <h6 class="mb-0"><a href="#" onClick={() => handleClick(f)}>{f?.name} {f?.lastname}</a></h6>
                              <p class="mb-0">{f.role}</p>
                           </div>
                          
                        </div>
                       
                        ))}
                       
                    
                       
                       
                    
                        
                     </div>
                     <div class="right-sidebar-toggle bg-primary mt-3">
                        <i class="ri-arrow-left-line side-left-icon"></i>
                        <i class="ri-arrow-right-line side-right-icon"><span class="ml-3 d-inline-block">Close Menu</span></i> 
                     </div>
                  </div>
               </div>
            </div>
         </div>
  
  </div>
</div>


  );
}
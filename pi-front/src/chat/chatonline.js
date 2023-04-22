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
  <div className="chatOnline">
    {onlineFriends.map((o) => (
      <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
          {/* use the correct property name: 'src', not 'source' */}
          <img
            className="chatOnlineImg"
            src={process.env.PUBLIC_URL + "/imagee/" +o.image}
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        {/* use optional chaining to prevent errors if 'o' is undefined */}
        <span className="chatOnlineName">{o?.username}</span>
      </div>
    ))}
    {friends.filter((f)=>f.id != currentId).map((f) => (
     
      // add a 'key' prop to avoid a warning about missing keys
      <div key={f.id} className="chatOnlineFriend" onClick={() => handleClick(f)}>
        <div className="chatOnlineImgContainer">
          {/* use the correct property name: 'src', not 'source' */}
          <img
            className="chatOnlineImg"
            src={process.env.PUBLIC_URL + "/imagee/" + f.image}
            alt=""
          />
          <div className=""></div>
        </div>
        {/* use optional chaining to prevent errors if 'f' is undefined */}
        <span className="chatOnlineName">{f?.username}</span>
      </div>
    ))}
  </div>
</div>

</div>
  );
}
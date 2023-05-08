import axios from "axios";
import { useEffect, useState } from "react";
import "./conv.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try {
        const res = await axios("coach/getuserbyid/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (

    
    <div className="conversation">
      <img
        className="conversationImg"
          src={user?.image }
        alt=""
      />
      <span className="conversationName">{user?.name}{user?.lastname}</span>
    </div>
    
  );
}
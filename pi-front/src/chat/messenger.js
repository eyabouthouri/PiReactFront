import "./messenger.css";
import Conversation from "./conversation";
import Message from "./message";
import ChatOnline from "./chatonline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import NavbarFront from "../components/NavbarFront";
import { json } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  
  const [userr,setuserr]= useState([])
  const scrollRef = useRef();
  const { isLoggedIn, isAdmin, isUser, userexisting } = useSelector((state) => state.session);
  const userconnecte = JSON.parse(userexisting)
  const [user,setuser]= useState(userconnecte);

console.log(user)
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(()=>{
    const fetchFriends = async () => {
        try {
          const res = await axios.get("http://localhost:5000/users/listuser", {
            withCredentials: true,
          });
          setuserr(res.data);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchFriends();
    }, [])
    console.log(userr)

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
if(user){
  socket.current.emit("addUser", user?._id);
  console.log(user?._id)
  socket.current.on("getUsers", (users) => {
      
    if (onlineUsers.length === 0) {
      console.log(onlineUsers.length)
     
    }
   console.log(users) 
    setOnlineUsers(
       userr.filter((f) => users.map((u) => u.userId).includes(f._id))
     
    );
  });
}
    
   
  }, [userr]);
 
  console.log(onlineUsers)
  useEffect(() => {
   
      
    
    const getConversations = async () => {

      try {
        if(user){
          const res = await axios.get("/conversation/" + user?._id);
          console.log(res.data)
          return res.data
        }
       

      } catch (err) {
        console.log(err);
      }
    };
    getConversations().then((obj,err)=>{setConversations(obj)})
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );
    console.log(receiverId)

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
     <Navbar></Navbar>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="form-control form-control-lg"  />
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="chatBox">
       
          <div className="chatBoxWrapper">
          <div class="">
        
          <div class="chat-header-icons d-flex justify-content-end ">
                                                   <a href="javascript:void();" class="chat-icon-phone">
                                                   <i class="ri-phone-line"></i>
                                                   </a>
                                                   <a href="javascript:void();" class="chat-icon-video">
                                                   <i class="ri-vidicon-line"></i>
                                                   </a>
                                                   <a href="javascript:void();" class="chat-icon-delete">
                                                   <i class="ri-delete-bin-line"></i>
                                                   </a>
                                                   <span class="dropdown">
                                                   <i class="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer" id="dropdownMenuButton01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu"></i>
                                                   <span class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton01">
                                                   <a class="dropdown-item" href="JavaScript:void(0);"><i class="fa fa-thumb-tack" aria-hidden="true"></i> Pin to top</a>
                                                   <a class="dropdown-item" href="JavaScript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete chat</a>
                                                   <a class="dropdown-item" href="JavaScript:void(0);"><i class="fa fa-ban" aria-hidden="true"></i> Block</a>
                                                   </span>
                                                   </span>
                                                </div>
                                                </div>
                                                

            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user?._id} user={user} />
                    </div>
                  ))}
                </div>
                <div className="">
               

                                                <div class="chat-footer p-3 bg-white">
                                             <form class="d-flex align-items-center"  action="javascript:void(0);">
                                                <div class="chat-attagement d-flex">
                                                   <a href="javascript:void();"><i class="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                                                   <a href="javascript:void();"><i class="fa fa-paperclip pr-3" aria-hidden="true"></i></a>
                                                </div>
                                                <textarea type="text" class="form-control mr-3" placeholder="Type your message" onChange={(e) => setNewMessage(e.target.value)}
                                                   value={newMessage}/>
                                                <button type="submit" class="btn btn-primary d-flex align-items-center p-2"  onClick={handleSubmit}><i class="fa fa-paper-plane-o" aria-hidden="true"></i><span class="d-none d-lg-block ml-1">Send</span></button>
                                             </form>
                                          </div>
                 
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
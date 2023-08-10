import React, { useEffect, useRef, useState } from 'react'
import "../styles/chat.css"
import { API, getAllMessagesFromDb, getAllUsers } from '../service/API'
import { useNavigate } from 'react-router'
import { Toaster,toast } from 'react-hot-toast'
import axios from 'axios'
import '../styles/chat.css'
import Contacts from '../components/Contacts'
import WelcomeMsg from '../components/WelcomeMsg'
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client"

const Chat = () => {
  const socket=useRef();
  const navigate=useNavigate()
  const [currentUser,setCurrentUser]=useState(undefined);

const [contacts,setcontacts]=useState([])
const[currentChat,setCurrentChat]=useState(undefined)

useEffect(()=>{
if(currentUser){
socket.current=io(API)
socket.current.emit("add-user",currentUser._id)

}
},[currentUser])

useEffect(()=>{
 let data= JSON.parse(localStorage.getItem("chat-app-user"))
setCurrentUser(data)
 if(!data){
   
 navigate('/login')
  
  }else(
    
    getUsers(data)
  )
},[])

//useeffect for all messages

//setUser

const getUsers=async(data)=>{

const res=await axios.get(API+`auth/get-allusers/${data._id}`)

if(res.data.success){
  setcontacts(res.data.contact)
}else{
  navigate("/setavatar")
}
}

//chage chat
const  changeChat=(contact)=>{
setCurrentChat(contact)

}


  return (
 <>
{currentUser&&
  <div className='container-wrap'>

<div className='container-inside'>

<div className='row'>
  <div className='col-md-4 hole-chattify'>
<Contacts contact={contacts} currentUser={currentUser} 
changeChat={changeChat} />
  </div>

<div  className='col-md-8 msg-wrapper' >
  {!currentChat?
    <WelcomeMsg currentUser={currentUser}/>
   :<ChatContainer currentChat={currentChat}  
   currentUser={currentUser} 
   socket={socket}
   />
    }

</div>
</div>
</div>

</div>
}




 <Toaster/>
 </>
  )
}

export default Chat
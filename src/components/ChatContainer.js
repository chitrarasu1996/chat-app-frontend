import React, { useEffect, useRef, useState } from 'react'
import "../styles/selecteduserdetails.css"
import {FaPowerOff} from "react-icons/fa"
import { json, useNavigate } from 'react-router'
import  '../styles/allmessge.css'
import ChatInput from './ChatInput'

import { API,sendMessage } from '../service/API'

import axios from 'axios'


const ChatContainer = ({currentChat,currentUser,socket}) => {

  const [allmessage,setAllMessages]=useState([])
  const [arrivalMessage,setarrivalMessage]=useState({})

  const scrollref=useRef()

  const navigate=useNavigate()
const logoutHandle=()=>{

  localStorage.clear();
  navigate("/login")

}

useEffect(()=>{
  scrollref.current?.scrollIntoView({
    behavior: "smooth"
  })
},[allmessage])

useEffect(()=>{
  
   getAllMessage()
  },[currentChat])
  
  const getAllMessage=async()=>{
const {data} =await axios.post(API+`msg/allmessages`,{
  from:currentUser._id,
  to:currentChat._id
})

setAllMessages(data.projectMessage)

  }
  
//handle sendmsg

const handleSendMsg=async(msg)=>{
try {
 await socket.current.emit("send-msg",{
    from:currentUser._id,
    to:currentChat._id,
    messages:msg
  })
  const {data}= await sendMessage(currentUser._id,currentChat._id,msg)
 
 let msgs=[...allmessage];
msgs.push({sender:true,msg})

setAllMessages(msgs)
} catch (error) {
  console.log(error) 
}
}

useEffect(()=>{
 console.log(socket.current.connected,"soket insdie")
if(socket.current){
  socket.current.on("msg-recieve",(msg)=>{

setarrivalMessage({sender:false,msg})
  })
}
},[])
useEffect(()=>{
  if(arrivalMessage){

    setAllMessages((prev)=>[...prev,arrivalMessage])
 }
},[arrivalMessage])



  return (
<>
<div className='d-flex justify-content-between align-items-center'>

<div className='selectedUserDetails'>
<img  className='currentImage'  
  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
     alt='avatar image'/>
<div>
  {currentChat.userName}
</div>

</div>
<div onClick={logoutHandle} className=' me-2 logoutbutton'>
  <FaPowerOff/>
</div>
</div>
<div>
  
</div>
<div >
<div className='allmessages'>

  {allmessage.map((msg,i)=>{
    return(
      <div ref={scrollref} 
      key={i} className={`message ${ msg.sender?"sended":"received"}`}>
      <div className="content">
           {msg.msg}
      </div>
      </div>
    )
  })}
</div>
</div>
<div >
<ChatInput handleSendMsg={ handleSendMsg} />
</div>



</>
  )
}

export default ChatContainer
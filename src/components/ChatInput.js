import React, { useState } from 'react'
import "../styles/input.css"
import {AiOutlineSend} from "react-icons/ai"
import {BsEmojiSmile} from "react-icons/bs"
import Picker from "emoji-picker-react"
const ChatInput = ({handleSendMsg}) => {

  const [emojiPickerShow,setEmojiPicker]=useState(false);
const[msg,setMsg]=useState("");

  const handleEmojiPickerShow=()=>{
setEmojiPicker(!emojiPickerShow)

  }
const emojipickerHandle=(emoji)=>{
let message=msg;
message+=emoji.emoji;

setMsg(message)
}

//send message

const sendMessage=(e)=>{
e.preventDefault()
if(msg.length>0){
  handleSendMsg(msg);

  setMsg("")
}else{
  alert("enter anysthig")
}



}
  return (
    <>
<div className="hole-input-container">
<div className='emoji-container ms-3 me-4'>
<BsEmojiSmile style={{fontSize:"20px"}} onClick={handleEmojiPickerShow}/>

{emojiPickerShow&&
<div className='emoji-picker-react'>

<Picker 
height="50vh"
placeholder="search"
  onEmojiClick={emojipickerHandle}/>
  </div>
  }

</div>

  <div>
    <input className='input-container' 
    onChange={(e)=>setMsg(e.target.value)}
    value={msg}
    placeholder='type your msg here' />
  </div>

<div >
 <button type='submit' className='send-button' onClick={sendMessage}><AiOutlineSend/></button>   
</div>

</div>
</>
  )
}

export default ChatInput
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios"
import { Buffer } from 'buffer'
import "../styles/avatars.css"
import loader from "../images/loader.gif"
import { setAvatarToDb } from '../service/API'
import { Navigate, useNavigate } from 'react-router'
import { json } from 'react-router'
const SetAvatar = () => {
    const avatarAPI="https://api.multiavatar.com/45678945";
const [avatars,setAvatar]=useState([]);
const navigate=useNavigate()
const [isLoading,setIsLoading]=useState(true)
const [selectedAvatar,setSelectedAvatar]=useState(undefined);

useEffect(()=>{
 const data=JSON.parse(localStorage.getItem("chat-app-user"))

    if(!localStorage.getItem("chat-app-user")){
       return navigate("/login")
      }else if(!data.inAvatarImageSet) {
    getAvatar()
      }else if(data.inAvatarImageSet){
        navigate("/")
      }
      
},[])


//getavatar
const getAvatar=async()=>{
    try {
        const data=[];
        for(let i=0;i<4;i++){
            let  avatarIamge=await axios.get(avatarAPI+`/${Math.round(Math.random()*1000)}`)
     const buffer=new Buffer(avatarIamge.data)
            data.push(buffer.toString("base64"))
      
        };
   
        setAvatar(data)
      
     setIsLoading(false)
    } catch (error) {
        console.log(error)
      
    }
}


//set Profile 
const setProfilePictures=async()=>{
 
if(selectedAvatar===undefined){
    toast.error("please select avatar")
}else{
const user=await JSON.parse(localStorage.getItem("chat-app-user"))


const {data}=await setAvatarToDb(user._id,avatars[selectedAvatar])
if(data.isSet){
    user.inAvatarImageSet=data.isSet;
    user.avatarImage=data.image
    localStorage.setItem("chat-app-user",JSON.stringify(user))
    navigate('/')
}else{
    toast.error("something went wrong wait a moment")
}
}
}

//check


  return (
<>
{ isLoading?<div className='hole-avatar-wrap '>
    <img className='loader-image' src={loader} alt='loader'/>
</div>:<div className='hole-avatar-wrap'>
<div>
    <h1 className='avatar-titlle text-white'>pick your avatar as your profile</h1>

</div>
<div className="avatars">
{avatars?.map((avatar,i)=>{
    return (
        <>
        <div key={i} className={`avatar ${selectedAvatar===i?"selected":""}`}> 


<img className='img-avatar'
onClick={()=>{setSelectedAvatar(i);
}} 
src={`data:image/svg+xml;base64,${avatar}`}  alt='avatar'/>
        </div>
       
      </>
    )
})}      
</div>
<button className='btn mb-2 mt-4 text-white' type='submit' onClick={setProfilePictures}>Set Profile as profile</button>  
<Toaster/>
</div>}
</>
  )
}


export default SetAvatar
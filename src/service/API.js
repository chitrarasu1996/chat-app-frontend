import axios from "axios"
export const API="https://chatapp-backend-oabz.onrender.com/"

export const registerUser=async(userName,email,password)=>{
    
const res=await axios.post(API+"auth/user",{userName,email,password})
return res

};

export const loginUserDetails=async(userName,password)=>{

     const res=await axios.post(API+"auth/login-user",{userName,password})

return res
    };

    //setAvatar

    export const setAvatarToDb=async(id,image)=>{
const res=await axios.post(API+`auth/setavatar/${id}`,{
     image
})
return res

    };

//store message

export const sendMessage=async(from,to,messages)=>{
   
const res=await axios.post(API+"msg/sendmessage",{from,to,messages})
return res
}
//get All messags

export const getAllMessagesFromDb=async(from,to)=>{
const res=await axios.get(API+"msg/allmessages",from,to)

}


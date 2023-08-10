import React, { useEffect, useState } from 'react'
import {FormGroup,Form,Label,Input,Button} from "reactstrap" 
import logo from "../images/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster,toast } from 'react-hot-toast'
import { loginUserDetails } from '../service/API'
const Login = () => {
  const[values,setValues]=useState({

    userName:"",
    password:"",

  })
  const navigate=useNavigate()
  const passwordValidation=async()=>{
  if(values.password.length<8){
      toast.error("password should be more than  than 8 characters ")
      return false
    }
    else if(values.userName.length<3){
      toast.error(" username should be more than 3 characters")
      return false
    }
    
    return true
    }

    //useEffect
    useEffect(()=>{
if(localStorage.getItem("chat-app-user")){
  navigate("/")
}
    },[])
  const submitHandle=async(e)=>{
    e.preventDefault()
    const valid=await passwordValidation()
    
    if(valid){
   const {data} =await loginUserDetails(values.userName,values.password);
   
    if(data.success){
      
      toast.success(data.message)
    localStorage.setItem("chat-app-user",JSON.stringify(data.foundUser
      ))
   setTimeout(()=>{
    navigate("/setavatar")

   },1000)
    }else{
      toast.error(data.message)
    }
    
    }
    
    
    }
  return (
    <div>
    <Form onSubmit={submitHandle} className='form-wrapper'>
  
  <div className='background-wrapper'>
   <div className='img-wrapper'>
     <h1>chattify</h1>
   <img  src={logo} alt='icon'/>
   </div>

 <FormGroup >

   <Label for="name">
     username
   </Label>
   <Input
  className='input-wrapper'
   value={values.userName}
   required
   onChange={(e)=>setValues({...values,userName:e.target.value})}
     id="name"
     name="name"
     placeholder="Enter Your name"
     type="text"
   />
 </FormGroup>

 <FormGroup>
   <Label for="password">
     password
   </Label>
   <Input
   className='input-wrapper'
     required
      value={values.password}
      onChange={(e)=>setValues({...values,password:e.target.value})}
     id="password"
     name="password"
     placeholder="Enter Your password"
     type="password"
     autoComplete='none'
   />
 </FormGroup>
 

 
<div>
 <button className='btn mb-2 button-container' type='submit'> login user </button>
</div>
<div className='gap-2 d-flex justify-content-center align-items-center '>
  <div className='have-account'>
Dont have an account ?
  </div>
  <Link  style={{textDecoration:"none"}} to={"/register"}>
  Register
   </Link>
</div>
  
   </div>
   < Toaster />
 </Form>
 </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import {FormGroup,Form,Label,Input,Button} from "reactstrap" 
import "../styles/form.css"
import logo from "../images/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../service/API'
const Register = () => {
  const[values,setValues]=useState({

    userName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  
  const navigate=useNavigate()
  //useeffect
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
        },[])

  const passwordValidation=async()=>{
    
    if(values.password!==values.confirmPassword){
      toast.error("password and confirm password doesn't match")
      return false
    
    }else if(values.password.length<8){
      toast.error("password or confirm password should be equal or more than  than 8 characters ")
      return false
    }else if(values.email.length<3){
      toast.error(" Email should be more than 3 characters")
      return false
    }
    else if(values.userName.length<3){
      toast.error(" username should be more than 3 characters")
      return false
    }
    
    return true
    }
  
  const submitHandle=async(e)=>{
e.preventDefault()
const valid=await passwordValidation()

if(valid){


const {data} =await registerUser(values.userName,values.email,values.password,values.confirmPassword);
if(data.success){

  navigate("/login")
  setTimeout(()=>{
    toast.success(data.message)

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
    <Label for="exampleEmail">
      Email
    </Label>
    <Input
      className='input-wrapper'
       value={values.email}
       onChange={(e)=>setValues({...values,email:e.target.value})}
      id="exampleEmail"
      name="email"
      placeholder="Enter Your email"
      type="email"
      required
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
  
  <FormGroup >
    <Label for="password1">
      Email
    </Label>
    <Input
      className='input-wrapper'
      required
       value={values.confirmPassword}
       onChange={(e)=>setValues({...values,confirmPassword:e.target.value})}
      id="password1"
      name="password1"
      placeholder="Confirm Password"
      type="password"
      autoComplete='none'
      
    />
   
  </FormGroup>
  
<div>
  <button className='btn mb-2 button-container' type='submit'> Create User</button>
</div>
<div className='gap-2 d-flex justify-content-center align-items-center '>
  <div className='have-account'>
  alreadt have an account ?
  </div>
  <Link  style={{textDecoration:"none"}} to={"/login"}>
  Login
  </Link>
</div>
   
    </div>
    < Toaster />
  </Form>
  </div>
  )
}

export default Register
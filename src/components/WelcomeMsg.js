import React from 'react'

import robot from "../images/robot.gif"
import "../styles/welcome.css"
const WelcomeMsg = ({currentUser}) => {

  return (
 <>
 {currentUser&&

  <div className='welcome-wrapper'> 
  <img style={{width:"50%"}} src={robot} alt='welcome gif'/>
  <div className='d-flex flex-column align-items-center '>
  <h1 style={{padding:"0.4rem"}} >Welcome<span className='ms-1

  ' style={{color:"#4e00ff"}}>{currentUser.userName} !</span>
   </h1>
  <h3>select any contact to start the message</h3>
  </div>
  </div>

 }
 </>
  )
}

export default WelcomeMsg
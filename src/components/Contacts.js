import React, { useEffect, useState } from 'react'
import "../styles/contact.css"
import Logo from "../images/logo.svg"
const Contacts = ({ contact, currentUser,changeChat }) => {

    const [cuurentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const[contactSelected,setContactSelected]=useState(undefined);

    const [particularContact,setParticularContact]=useState("");

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.userName)
            setCurrentUserImage(currentUser.avatarImage)
        }
    }, [currentUser])

  const changCurrentChat=(contact,i)=>{
setContactSelected(i)

changeChat(contact)

  }
    return (
        <div className='hole-chattify '>
      
            {currentUserImage && cuurentUserName &&
          
<>
            <div className='brand' >
                <img className='logo ' src={Logo} alt='logo'/>
                <h2 className='text-white '>CHATTIFY</h2>

                 </div>
              <div className='contacts'>
               
                     {contact&&contact.map((contact,i)=>(
                    <div  onClick={()=>changCurrentChat(contact,i)}  
                     key={i} className={`ms-2  contact  ${contactSelected===i ? "selected":""}`}>
                         
                         <div className='d-flex gap-3 align-items-center'>
                            <img  className='currentImage'  
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                            alt='avatar image'/>
                         
                                 {contact.userName}
                         </div>
                    </div>
                    
                ))}       
          </div>
          <div className='current_user'>
                    <img  className='img-wrap me-2'
                    src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}/>
                    {currentUser.userName}
                </div>
                  </>
            }

        </div>
    )
}

export default Contacts
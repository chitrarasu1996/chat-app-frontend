import { Route,Routes } from "react-router";
import Register from "./components/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import SetAvatar from "./pages/SetAvatar";
import Contacts from "./components/Contacts";
function App() {

  
  return (
    <div className="App">
    
 <Routes>

  <Route path="/register" element={<Register/>} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/" element={<Chat/>}/>
  <Route path="/contacts" element={<Contacts/>}/>
  <Route path="/setavatar" element={<SetAvatar/>}/>
 </Routes>
    </div>
  );
}

export default App;

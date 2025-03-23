import { useState } from "react";
import Welcome from "./Components/Welcome"
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from "./Components/Home";
import SharedLayout from "./Components/SharedLayout";
import DetectImage from "./Components/DetectImage";
import DetectNews from "./Components/DetectNews";
import Register from "./Components/Register";
import './App.css';
function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/"  element = {<Welcome setUser={setUser}/>}/>
      <Route path ="/dashboard" element={<SharedLayout user={user}/>}>
        <Route index element={<Home/>}></Route>
        <Route path="detect-image" element={<DetectImage/>}></Route>
        <Route path="detect-news" element={<DetectNews/>}></Route>
      </Route>
      <Route path="register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

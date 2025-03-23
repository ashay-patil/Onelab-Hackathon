import { useState } from "react";
import Welcome from "./Components/Welcome"
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from "./Components/Home";
import SharedLayout from "./Components/SharedLayout";

function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/"  element = {<Welcome setUser={setUser}/>}/>
      <Route path ="/dashboard" element={<SharedLayout/>}>
        <Route index element={<Home/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

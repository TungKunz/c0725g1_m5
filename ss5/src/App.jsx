import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";
import PlayerManagerComponent from "./component/PlayerManagerComponent.jsx";
import AddComponent from "./component/AddComponent.jsx";
import NavbarComponent from "./component/NavbarComponent.jsx";
import {ToastContainer} from "react-toastify";
import DetailComponent from "./component/DetailComponent.jsx";
import EditComponent from "./component/EditComponent.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavbarComponent/>
     <Routes>
         <Route path={'/'} element={<PlayerManagerComponent/>}>
             <Route path={'/:id'} element={<DetailComponent/>}/>
         </Route>
         <Route path={'/add'} element={<AddComponent/>}></Route>
         <Route path={'/detail/:id'} element={<DetailComponent/>}></Route>
         <Route path={'/edit/:id'} element={<EditComponent/>}></Route>
     </Routes>
        <ToastContainer/>
    </>
  )
}

export default App

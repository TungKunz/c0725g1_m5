import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlayerManagerComponent from "./component/PlayerManagerComponent.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PlayerManagerComponent/>
    </>
  )
}

export default App

import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return React.createElement("div",null,React.createElement("h2",null,"Danh sách thành phố trực thuộc trung ương"),
      React.createElement("ul",null,React.createElement("li",null,"Hà Nội")
                                               ,React.createElement("li",null,"Huế"),React.createElement("li",null,"Sài Gòn")))
}
export default App

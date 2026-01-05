import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CustomerTable from "./CustomerTable.jsx";
import SignInForm from "./SignInForm.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <CustomerTable/>
      <SignInForm/>
  </StrictMode>,
)

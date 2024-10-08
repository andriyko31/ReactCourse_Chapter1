import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AddressBookApp from './AddressBookApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddressBookApp />
  </StrictMode>,
)

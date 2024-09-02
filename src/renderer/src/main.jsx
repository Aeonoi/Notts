import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import Editor from './Editor'
import Sidebar from './Sidebar'
import Allnotes from './Allnotes'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

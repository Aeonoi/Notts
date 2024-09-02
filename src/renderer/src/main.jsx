import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import Editor from './Editor'
import Sidebar from './Sidebar'
import Allnotes from './Allnotes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 min-h-screen min-w-screen flex-col'>
      <Sidebar />
      <Allnotes />
      <Editor />
    </div>
    <script type="module" src="./src/backend.js"></script>
  </React.StrictMode>
)

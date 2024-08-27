import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import Editor from './Editor'
import Sidebar from './Sidebar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='grid grid-cols-2 gap-2'>
      <Sidebar className="w-2/5" />
      <Editor />
    </div>
  </React.StrictMode>
)

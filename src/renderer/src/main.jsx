import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import Editor from './Editor'
import Sidebar from './Sidebar'
import Allnotes from './Allnotes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='grid h-screen w-screen grid-cols-1 md:grid-cols-3 gap-1'>
      <Sidebar className='hidden md:block' />
      <Allnotes className='hidden md:block' />
      <Editor className='' />
    </div>
  </React.StrictMode>
)

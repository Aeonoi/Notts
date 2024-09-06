import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Editor from './Editor'
import Sidebar from './Sidebar'
import AllNotes from './AllNotes'
import './styles/styles.css'

function App() {
  // Note and folder are IDs
  const [currentNote, setCurrentNote] = useState('')
  const [currentFolder, setCurrentFolder] = useState('')

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 min-h-screen min-w-screen flex-col'>
      <Sidebar setCurrentFolder={setCurrentFolder} />
      <AllNotes setCurrentNode={setCurrentNote} currentFolderId={currentFolder} />
      <Editor currentNoteId={currentNote} />
    </div>
  )
}

export default App

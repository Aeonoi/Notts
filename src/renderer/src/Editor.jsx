import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import './styles/Editor.css'

function Editor() {
  const [value, setValue] = useState("")

  const writeNote = (noteVal) => {
    setValue(noteVal)
    console.log(noteVal)
  }



  return (
    <div className='w-screen h-screen'>
      <MDEditor
        value={value}
        onChange={(e) => writeNote(e)}
        preview="edit"
        height="100%"
        visibleDragbar={false}
      />
    </div>
  )
}

export default Editor 

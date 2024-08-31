import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { createMarkdownFile, deleteMarkdownFile, updateMarkdownFile } from './backend/app.js'
import './styles/Editor.css'
const API_BASE_URL = "http://localhost:5000/api";

function Editor() {
  const [value, setValue] = useState("")
  // get when viewing a note or creating a note
  const markdownFileId = '66d2754289323bf9daf9aee5'

  useEffect(() => {
    // fetch the data
    fetch(`${API_BASE_URL}/markdown/${markdownFileId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error");
      })
      .then((content) => {
        const contentArray = JSON.parse(JSON.stringify(content))
        // replaces all '\n' with new lines
        const contentText = contentArray.content;
        const regex = /\\n/g;
        setValue(contentText.replace(regex, "\n"))
      })
      .catch((error) => console.error("Error: " + error));
  }, []);


  const writeNote = (noteVal) => {
    setValue(noteVal)

    // TODO: Update every few seconds rather than every new character
    updateMarkdownFile(markdownFileId, noteVal)
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

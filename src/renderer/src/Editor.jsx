import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { saveMarkdownFile, getMarkdownFile, deleteMarkdownFile } from './app.js'
import './styles/Editor.css'
const API_BASE_URL = "http://localhost:5000";

function Editor() {
  const [value, setValue] = useState("")

  useEffect(() => {
    // fetch the data
    fetch(`${API_BASE_URL}/markdown/temp.md`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error");
      })
      .then((content) => {
        const contentArray = JSON.parse(JSON.stringify(content))
        setValue(contentArray.content)
      })
      .catch((error) => console.error("Error: " + error));
  }, []);


  const writeNote = (noteVal) => {
    setValue(noteVal)

    // save markdown file, creates POST request
    // delayed by one character (not including copies)
    saveMarkdownFile("temp1.md", noteVal)
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

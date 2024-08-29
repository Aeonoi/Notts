import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { saveMarkdownFile, getMarkdownFile, deleteMarkdownFile } from './app.js'
import './styles/Editor.css'

function Editor() {
  const [value, setValue] = useState("")

  useEffect(() => {
    const fetchFile = async () => {
      const result = await getMarkdownFile("temp.md");
      console.log("RESULT: " + result)
      if (result.content) {
        setContent(result.content);
      }
    };
    fetchFile();
  }, []);


  const writeNote = (noteVal) => {
    setValue(noteVal)

    // save markdown file, creates POST request
    // delayed by one character (not including copies)
    saveMarkdownFile("temp1.md", value)
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

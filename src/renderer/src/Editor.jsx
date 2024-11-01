import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { updateMarkdownFile } from "./backend/app";
import "./styles/Editor.css";
const API_BASE_URL = "http://localhost:5000/api";

function Editor({ currentNoteId }) {
  const [value, setValue] = useState("");
  // get when viewing a note or creating a note
  // const [markdownFileId, setMarkdownFileId] = useState('66d2754289323bf9daf9aee5')
  const [markdownFileId, setMarkdownFileId] = useState("");

  useEffect(() => {
    setMarkdownFileId(currentNoteId);
    if (markdownFileId != "") {
      document.getElementById("Editor").hidden = false;
      // fetch the data
      fetch(`${API_BASE_URL}/markdown/${markdownFileId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error");
        })
        .then((content) => {
          const contentArray = JSON.parse(JSON.stringify(content));
          // replaces all '\n' with new lines
          const contentText = contentArray.content;
          const regex = /\\n/g;
          setValue(contentText.replace(regex, "\n"));
        })
        .catch((error) => console.error("Error: " + error));
    } else {
      document.getElementById("Editor").hidden = true;
    }
  }, [currentNoteId, markdownFileId]);

  const writeNote = (noteVal) => {
    setValue(noteVal);
    updateMarkdownFile(markdownFileId, noteVal);
  };

  return (
    // TODO: If value and markdown file id is empty, then when there is a new value set, ask the user if they want to create a new file (in a form)
    // TODO: When a new value is written, update the updated time of the note
    // Show editor only when a note was selected
    <div className="min-h-screen min-w-screen flex flex-col">
      <MDEditor
        value={value}
        onChange={(e) => writeNote(e)}
        preview="edit"
        height="100%"
        hidden={true}
        visibleDragbar={false}
        enableScroll={false}
        id="Editor"
      />
    </div>
  );
}

export default Editor;

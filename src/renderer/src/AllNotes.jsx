// var: global, let: dynamic type (can switch), const: one type
import React, { useEffect, useState } from "react"
const API_BASE_URL = "http://localhost:5000/api";
import '../../input.css'


function AllNotes({ currentFolderId, setCurrentNode }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    // Show all notes when no folder is selected
    if (currentFolderId == "") {
      fetch(`${API_BASE_URL}/markdown`, {
        method: "GET"
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error");
        })
        .then((content) => {
          setNotes(content)
        })
        .catch((error) => console.error("Error: " + error));
    }
    else {
      setNotes([])
      fetch(`${API_BASE_URL}/folder/${currentFolderId}/notes`, {
        method: "GET"
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error");
        })
        .then((content) => {
          const currentNotes = []
          // fetech all "real" notes from the note's ids (gather the note's json)
          content.map((note, index) => (
            fetch(`${API_BASE_URL}/markdown/${note}`,
              { method: "GET" }
            )
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Error");
              })
              .then((noteContent) => {
                currentNotes.push(noteContent);
                if (index === content.length - 1) {
                  setNotes(currentNotes)
                }
              }
              )
              .catch((error) => console.error("Error: " + error))
          ))
        }
        )
        .catch((error) => console.error("Error: " + error));
    }
  }, [currentFolderId]);

  // TODO: Right click on note should allow for delete of note
  return (
    <ul className="hidden md:block max-w-[20rem] divide-y divide-gray-200 dark:divide-gray-700">
      {notes.map(note => (
        <li key={note._id} className="pb-3 sm:pb-4 hover:bg-red-500" onClick={() => setCurrentNode(note._id)}>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium flex text-gray-900">
                <div className="flex-1 text-center">
                  {note.title}
                </div>
              </div>
              <div className="flex text-sm font-medium text-gray-500">
                <div className="flex-1 text-left" id="modifed">
                  Created On: {note.createdAt}
                </div>
                <div className="flex-1 text-right" id="lastVisited">
                  Last Updated: {note.updatedAt}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}

    </ul>
  )
}

export default AllNotes

import React, { useState } from "react"
import '../../input.css'

function Allnotes() {
  const [folderName, setFolderName] = useState('Test')

  /// Get all notes 
  const notes = ["Lebron", "James"]

  return (
    <ul className="hidden md:block max-w-[20rem] divide-y divide-gray-200 dark:divide-gray-700">
      {notes.map(note => (
        <li className="pb-3 sm:pb-4" id="list">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium flex text-gray-900">
                <div className="flex-1">
                  Header of file: {note}
                </div>
              </div>
              <div className="flex text-sm font-medium text-gray-500">
                <div className="flex-1 text-left" id="modifed">
                  Modified:
                </div>
                <div className="flex-1 text-right" id="lastVisited">
                  Last Visited:
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}

    </ul>
  )
}

export default Allnotes

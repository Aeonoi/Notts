import React, { useState, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

import Markdown from 'react-markdown'
import './styles/Editor.css'


function Editor() {
  const [value, setValue] = useState("")

  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
    // TODO: Save val in a database 
  }, []);
  return (
    <div>
      <CodeMirror value={value} onChange={onChange} extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />
    </div>
  )
}



export default Editor 

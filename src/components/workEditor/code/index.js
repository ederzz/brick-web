import React from 'react'
import codemirror from 'codemirror'
import jsonlint from '../../../utils/jsonlint'

import 'codemirror/mode/javascript/javascript'

import './index.css'

export default class Code extends React.Component {
  constructor(props) {
    super(props)
    this.textareaRef = React.createRef()
  }

  componentDidMount () {

    this.codeMirror = codemirror.fromTextArea(this.textareaRef.current, {
      mode: "javascript",
      theme: 'panda-syntax',
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true
    });

    this.codeMirror.on('change', this.onChange);

    this.setValue(this.props.code)


  }


  setValue = (value) => {
    this.codeMirror.setValue(value || '');
  }

  onChange = (doc, change) => {
    const { setJsonErr, setCode } = this.props
    let code = doc.getValue()

    try {
      code = jsonlint.parse(code)
      setCode(code)
      setJsonErr(null)
    }
    catch (err) {
      setJsonErr(err.toString())
    }
  }


  render() {
    return (
      <div className="work-code">
        <textarea
          ref={this.textareaRef}
          autoComplete="off"
          autoFocus={true}
        />
      </div>
    )
  }


}
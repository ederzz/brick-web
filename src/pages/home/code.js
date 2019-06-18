import React from 'react'
import codemirror from 'codemirror'

import 'codemirror/mode/javascript/javascript'

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
    //console.log('on change',doc.getValue())
    let code = doc.getValue()
    code = code.replace(/\/\/.*/g, "")
    //code = code.replace(/[\r\n]/g, "")
    //code = code.replace(/\ +/g, "")
    code = code.replace(/\s/g, "")
    code = code.replace(/[a-zA-Z0-9]+(?=:)/g,'"$&"')
    code = code.replace(/'/g,'"')
    this.props.setCode(code)
  }


  render() {
    return (
      <div className="home-code">
        <textarea
          ref={this.textareaRef}
          autoComplete="off"
          autoFocus={true}
        />
      </div>
    )
  }


}
import React from 'react'
import codemirror from "codemirror";

export default class ExplainDemo extends React.Component {

  constructor(props) {
    super(props)
    this.textareaRef = React.createRef()
    this.demoCode = '{\n' +
      '  ui: "crm-layout",\n' +
      '  brick: {\n' +
      '    aside: "crm-aside",\n' +
      '    header: "crm-header",\n' +
      '    body: [\n' +
      '      {\n' +
      '        ui: "crm-panel"\n' +
      '      },\n' +
      '      {\n' +
      '        ui: "crm-panel"\n' +
      '      },\n' +
      '      {\n' +
      '        ui: "crm-panel"\n' +
      '      }\n' +
      '    ]\n' +
      '  }\n' +
      '}'
  }

  componentDidMount () {

    this.codeMirror = codemirror.fromTextArea(this.textareaRef.current, {
      mode: "javascript",
      theme: 'panda-syntax',
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true
    });
    this.setValue(this.demoCode)


  }
  setValue = (value) => {
    this.codeMirror.setValue(value || '');
  }
  render() {
    return(<div>
          <textarea
            ref={this.textareaRef}
            autoComplete="off"
            autoFocus={true}
          />
    </div>)

  }


}
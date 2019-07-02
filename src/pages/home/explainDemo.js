import React from 'react'
import codemirror from "codemirror";

export default class ExplainDemo extends React.Component {

  constructor(props) {
    super(props)
    this.textareaRef = React.createRef()
    this.demoCode = '{\n' +
      '  ui: "sys-layout",\n' +
      '  brick: {\n' +
      '    aside: "sys-aside",\n' +
      '    header: "sys-header",\n' +
      '    body: [\n' +
      '      {\n' +
      '        ui: "sys-panel",\n' +
      '        brick: {\n' +
      '          title: "面板标题/s",\n' +
      '          body: ""\n' +
      '        }\n' +
      '      },\n' +
      '      {\n' +
      '        ui: "sys-panel"\n' +
      '      },\n' +
      '      {\n' +
      '        ui: "sys-panel"\n' +
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
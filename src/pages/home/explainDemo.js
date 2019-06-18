import React from 'react'
import codemirror from "codemirror";

export default class ExplainDemo extends React.Component {

  constructor(props) {
    super(props)
    this.textareaRef = React.createRef()
    this.demoCode = '{\n' +
      '  ui: \'normal-layout\', // 主模块布局名称\n' +
      '  brick: {// 主模块包含的子模块\n' +
      '    top: \'top-qq\', // 子模块（布局的头部填充块）\n' +
      '    left: \'left-163\', // 子模块（布局的左侧填充块）\n' +
      '    main: {// 子模块 (引用另一个主模块)\n' +
      '      ui: \'main-sina\', // 布局主体采用的UI\n' +
      '      brick: {\n' +
      '        list: \'list-baidu\', // 主体列表块\n' +
      '        page: \'page-google\' // 主体列表分页块\n' +
      '      }\n' +
      '    },\n' +
      '    footer: [\n' +
      '      {\n' +
      '        ui: \'a1-b1\',\n' +
      '        brick: {\n' +
      '          head: \'a11-b11\'\n' +
      '        }\n' +
      '      },\n' +
      '      {\n' +
      '        ui: \'a2-b2\'\n' +
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
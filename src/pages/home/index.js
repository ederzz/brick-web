import React from 'react'
import {toolTip} from '@/ui'
import Editor from './editor'
import Code from './code'
import Explain from './explain'
import ENV from '../../config/env'
import CreateWorks from '../../components/createWorks'
import {jsonToUrl} from '../../utils/url'

import './index.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeOld: '// 输入一个JSON\n' +
      '{\n' +
      '  ui: \"sys-layout\",\n' +
      '  brick: {\n' +
      '  }\n' +
      '}',
      createWorksVisible: false,
      code: '{\n' +
      '      "ui": "sys-layout",\n' +
      '      "brick": {\n' +
      '        "aside": "sys-aside",\n' +
      '        "header": {\n' +
      '            "ui": "sys-header",\n' +
      '            "brick": {\n' +
      '               "logo":"sys-logo"\n' +
      '            }\n' +
      '},\n' +
      '        "body": [\n' +
      '          {\n' +
      '            "ui": "sys-panel",\n' +
      '            "brick": {\n' +
      '              "title": "面板标题/s",\n' +
      '              "body": ""\n' +
      '            }\n' +
      '          },\n' +
      '          {\n' +
      '            "ui": "sys-panel"\n' +
      '          },\n' +
      '          {\n' +
      '            "ui": "sys-panel"\n' +
      '          },\n' +
      '          {\n' +
      '            "ui": ""\n' +
      '          }\n' +
      '        ]\n' +
      '      }\n' +
      '    }'
    }
  }

  setCode = (code) => {
    this.setState({code})
  }

  createWorksOpen = () => {
    this.setState({createWorksVisible: true})
  }

  createWorksClose = () => {
    this.setState({createWorksVisible: false})
  }

  render() {
    const { code, createWorksVisible } = this.state
    const {httpAgent} = this.props
    const jsonUrl = jsonToUrl(code)
    //console.log('home render',this.props)
    return (
      <div className="wrap clearfix">

        <Editor code={code} setCode={this.setCode}/>

        <div className="home-url">
          <input id="url" readOnly value={`${ENV.HOME}/p?json=${jsonUrl}`} />
          <a
            href={`${ENV.HOME}/p?json=${jsonUrl}`}
            target="_p"
            className="url-view"
            onMouseEnter={(e) => {
              toolTip({e, msg: '您可以保存或分享此地址，以便随时查看', position: 'top'})
            }}
            onMouseLeave={() => toolTip({leave: true})}
          >查看</a>
          <button className="url-save" onClick={this.createWorksOpen}>保存到我的作品</button>
          {createWorksVisible ? <CreateWorks httpAgent={httpAgent} modalClose={this.createWorksClose} code={code} /> : null}
        </div>

      </div>
    )
  }


}
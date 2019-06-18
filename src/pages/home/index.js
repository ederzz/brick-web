import React from 'react'
import Code from './code'
import Explain from './explain'

import './index.css'
//import './codemirror.css'
//import './panda-syntax.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// 输入一个JSON\n' +
      '{\n' +
      '  ui: \"top-left-layout\",\n' +
      '  brick: {\n' +
      '  }\n' +
      '}'
    }
  }

  setCode = (code) => {
    this.setState({code})
  }

  render() {
    const { code } = this.state
    return (
      <div className="wrap clearfix">

        <div className="clearfix">
          <Code code={code} setCode={this.setCode}/>
          <Explain/>
        </div>

        <div className="home-url">
          <input id="url" value={`http://www.brickui.com/p?json=${code}`} />
          <a href={`http://www.brickui.com/p?json=${code}`} target="_blank" className="url-view">查看</a>
          <button className="url-save">保存到我的作品</button>
        </div>

      </div>
    )
  }


}
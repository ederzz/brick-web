import React from 'react'
import {toolTip} from '@/ui'
import Code from './code'
import Explain from './explain'
import ENV from '../../config/env'
import CreateWorks from '../../components/createWorks'

import './index.css'
//import './codemirror.css'
//import './panda-syntax.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// 输入一个JSON\n' +
      '{\n' +
      '  ui: \"sys-layout\",\n' +
      '  brick: {\n' +
      '  }\n' +
      '}',
      createWorksVisible: false,
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
    console.log('home render',this.props)
    return (
      <div className="wrap clearfix">

        <div className="clearfix">
          <Code code={code} setCode={this.setCode}/>
          <Explain/>
        </div>

        <div className="home-url">
          <input id="url" value={`${ENV.HOME}/p?json=${code}`} />
          <a
            href={`${ENV.HOME}/p?json=${code}`}
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
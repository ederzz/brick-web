import React from 'react'
import {Scroll, toolTip, tosts} from '@/ui'
import Create from './create'
import Code from './code'
import Set from './set'
import Explain from './explain'
import './index.css'
import ENV from "../../config/env"

export default class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 'create',
      code: {ui:""},
      info: undefined,
      editorTool: null,
      jsonErr: null,
    }
  }

  componentDidMount() {
    const {initCode, editorInfo, type='editor'} = this.props
    if (initCode) {
      this.setState({code: initCode})
    }
    if (editorInfo) {
      // 编辑
      const info = {
        thumb: editorInfo.thumb,
        name: editorInfo.name,
        tags: editorInfo.tags
      }
      this.setState({info})
    }

    if (type === 'view') {
      this.setState({active: 'code'})
    }
  }

  setEditorTool = (editorTool) => {
    this.setState({editorTool})
  }

  setJsonErr = (jsonErr) => {
    this.setState({jsonErr})
  }

  setCode = (code) => {
    this.setState({code})
  }

  setInfo = (info) => {
    this.setState({info})
  }

  onTab = (v) => {
    this.setState({active: v.type})
  }


  onCheck = () => {
    const {info={}} = this.state
    const {name, tags} = info
    let error
    if(!name) {
      error = '请填写作品名称'
    }else if(!tags) {
      error = '请填写标签'
    }

    return error
  }

  onSave= () => {
    const {httpAgent, history, id} = this.props
    const {code, info={}} = this.state
    const {name, tags, thumb} = info

    const check = this.onCheck()
    if(check) {
      tosts.error(check)
      return
    }

    const body = {
      name,
      thumb,
      tags:tags.split(/;|；/),
      code: JSON.stringify(code),
    }

    let uri = '/works/create'
    if(id !== '0') {
      body.id = id
      uri = '/works/save'
    }


    httpAgent.post(uri, body).then(res => {
      const {code, message, data} = res
      if (code === 0) {
        tosts.success(message)
        if(id==='0') {
          // 如果是新建跳转到相关编辑页面
          history.push(`/works/${data}`)
        }
      } else {
        tosts.error(message)
      }
    })
  }

  render() {
    const {setCode, setEditorTool, setJsonErr} = this
    const {httpAgent, id, type='editor'} = this.props
    const {active, code, info, editorTool, jsonErr} = this.state
    let activeObj = undefined
    const codeStr = JSON.stringify(code,null,4)
    //const jsonUrl = jsonToUrl(codeStr)
    const jsonUrl = JSON.stringify(code)

    let tabs = [
      {
        type: 'create',
        title: '创作',
        body: <Create code={code} setCode={setCode} httpAgent={httpAgent} setEditorTool={setEditorTool}/>
      },
      {
        type: 'set',
        title: '设置',
        body: <Set httpAgent={httpAgent} info={info} setInfo={this.setInfo}/>
      },
      {
        type: 'code',
        title: '源码',
        body: <Code code={codeStr} setCode={setCode} setJsonErr={setJsonErr}/>
      },
      {
        type: 'explain',
        title: '说明',
        body: <Explain/>
      },
    ]

    if(type === 'view') {
      tabs = [
        {
          type: 'code',
          title: '源码',
          body: <Code code={codeStr} setCode={setCode} setJsonErr={setJsonErr}/>
        },
        {
          type: 'create',
          title: '创作',
          body: <Create code={code} setCode={setCode} httpAgent={httpAgent} setEditorTool={setEditorTool}/>
        }
      ]
    }


    for (const i in tabs) {
      if (tabs[i].type === active) {
        activeObj = tabs[i]
        break
      }
    }

    return (<div className="work-editor clearfix">
      <div className="work-tabs">
        <div className="head">
          {tabs.map(v => {
            return <span
              key={v.type}
              className={v.type === active ? 'active' : ''}
              onClick={() => {
                this.onTab(v)
              }}
            >{v.title}</span>
          })}
          {type === 'view' ? null : <div className="tool">
            {editorTool}
          </div>}
        </div>
        <div className="body">
          <Scroll>
            {activeObj.body}
          </Scroll>
        </div>
        {jsonErr ? <div className="json-err">{jsonErr}</div>: null}
      </div>
      {type === 'view' ? null : <div className="work-url">
        <input id="url" readOnly value={`${ENV.HOME}/p?json=${jsonUrl}`}/>
        <a
          href={`${ENV.HOME}/p?json=${jsonUrl}`}
          target="_p"
          className="url-view"
          onMouseEnter={(e) => {
            toolTip({e, msg: '您可以保存或分享此地址，以便随时查看', position: 'top'})
          }}
          onMouseLeave={() => toolTip({leave: true})}
        >查看</a>
        <button className="url-save" onClick={this.onSave}>{id === '0' ? '保存' : '修改'}</button>
      </div>}
    </div>)

  }


}
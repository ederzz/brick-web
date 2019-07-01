import React from 'react'
import Code from './code'
import {toolTip, tosts} from '@/ui'
import ENV from "../../config/env";
import './editor.css'

export default class WorksEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: undefined,
      saving: false
    }
  }

  componentDidMount () {
    this.getCode()
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  setCode = (code) => {
    this.setState({code})
  }

  getCode = () => {

    const { httpAgent, match:{params:{id}} } = this.props

    if(id === '0') {
       // 0  新建
      return
    }

    httpAgent.get(`/wall/getMyWorks?id=${id}`).then(res=>{

      const {code,data,message} =res

      if(code === 0) {
        this.setState({
          code: data.code || '',
          name: data.name || '',
          tags: data.tags ? data.tags.join(';') : '',
        })
      }else{
        tosts.error(message)
      }

    })

  }

  onCheck = () => {
    const {name, tags, code} = this.state
    let error
    if(!code) {
      error = '请填写模块JSON数据'
    }else if(!name) {
      error = '请填写作品名称'
    }else if(!tags) {
      error = '请填写标签'
    }

    return error
  }

  onSave = () => {
    const { httpAgent, match: {params: {id}} } = this.props
    const {name, tags, code} = this.state

    const check = this.onCheck()
    if(check) {
      tosts.error(check)
      return
    }

    const body = {
      name,
      tags:tags.split(/;|；/),
      code
    }

    let uri = '/wall/create'
    if(id !== '0') {
      body.id = id
      uri = '/wall/save'
    }

    this.setState({
      saving: true
    })

    httpAgent.post(uri, body).then(res => {
      const {code, message} = res
      if (code === 0) {
        tosts.success(message)
      } else {
        tosts.error(message)
      }

      this.setState({
        saving: false
      })
    })

  }


  render() {

    console.log('editor',this.state)
    const { match:{params:{id}} } = this.props
    const { code, name, tags, saving } = this.state

    if(code === undefined && id !== '0') {
      return null
    }

    return(<div className="works-editor wrap clearfix">
      <div className="info">
        <Code code={code} setCode={this.setCode}/>
        <div className="detail">
          <div className={`formitem`}>
            <label className="lab">名称：</label>
            <div className="mix">
              <input
                value={name}
                name="name"
                type="text"
                className="ipt"
                placeholder="作品名称"
                onChange={this.onChange}
                onBlur={this.onNameBlur}
              />
            </div>
          </div>
          <div className="formitem">
            <label className="lab">标签：</label>
            <div className="mix">
              <input value={tags} name="tags" type="text" className="ipt" placeholder="多个标签用分号(;)分隔" onChange={this.onChange}/>
            </div>
          </div>
          <div className="formitem  footer">
            <div className="mix">
              <a
                href={`${ENV.HOME}/p?json=${code}`}
                target="_p"
                className="btn btn-primary"
                onMouseEnter={(e) => {
                  toolTip({e, msg: '您可以保存或分享此地址，以便随时查看', position: 'top'})
                }}
                onMouseLeave={() => toolTip({leave: true})}
              >查看</a>
              <button className={`btn btn-primary ${saving ? 'loading' : ''}`} onClick={this.onSave}>{id === '0' ? '创建' : '修改'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>)

  }

}
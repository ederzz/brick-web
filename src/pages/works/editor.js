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
    }
  }

  componentDidMount () {
    this.getCode()
  }

  setCode = (code) => {
    this.setState({code})
  }

  getCode = () => {

    const { httpAgent, match:{params:{id}} } = this.props
    httpAgent.get(`/wall/getMyWorks?id=${id}`).then(res=>{

      const {code,data,message} =res

      if(code === 0) {
        this.setState({
          code: data.code || ''
        })
      }else{
        tosts.error(message)
      }

    })

  }


  render() {

    console.log('editor',this.state)

    const { code, name, tags } = this.state

    if(code === undefined) {
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
          <div className="formitem">
            <label className="lab">图片：</label>
          </div>
          <div className="formitem">
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
              <button className="btn btn-primary" onClick={this.onCreate}>保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>)

  }

}
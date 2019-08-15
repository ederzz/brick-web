import React from 'react'
import UploadImg from '../../uploadImg'
import './index.css'

export default class Login extends React.Component {

  onChange = (e) => {
    const {info,setInfo} = this.props
    const name = e.target.name
    const value = e.target.value
    setInfo({...info,[name]: value})
  }

  render() {
    const { info={}, httpAgent } = this.props
    const {name, tags, thumb} = info
    return (<div className="set-works">
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
      <div className="formitem" style={{width: '100%'}}>
        <label className="lab">图片：</label>
        <div className="mix">
          <UploadImg
            httpAgent={httpAgent}
            value={thumb}
            onChange={(url) => {
              this.onChange({target: {name: 'thumb', value: url}})
            }}
          />
        </div>
      </div>
      </div>)

  }


}
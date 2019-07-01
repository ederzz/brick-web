import React from 'react'
import {tosts, Modal} from '@/ui'
import './index.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      tags:'',
    }
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  onCheck = () => {
    const {name, tags} = this.state
    let error
    if(!name) {
      error = '请填写作品名称'
    }else if(!tags) {
      error = '请填写标签'
    }

    return error
  }

  onCreate = () => {
    const {httpAgent, modalClose, code} = this.props
    const {name, tags} = this.state

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
    httpAgent.post('/wall/create', body).then(res => {
      const {code, message} = res
      if (code === 0) {
        tosts.success(message)
        modalClose()
      } else {
        tosts.error(message)
      }
    })
  }


  render() {
    const {modalClose} = this.props
    const {name, tags} = this.state
    return (<Modal
      show={true}
      onMask={modalClose}
    >
      <div className="create-modal">
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
          <div className="mix">
            <button className="btn btn-primary" onClick={this.onCreate}>保存</button>
          </div>
        </div>
      </div>
    </Modal>)

  }


}
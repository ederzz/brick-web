import React from 'react'
import {tosts, Modal} from '@/ui'
import './index.css'
import {storeAuth} from "../../utils/auth";

export default class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  getCode = () => {
    const {httpAgent} = this.props
    const {phone} = this.state
    const body = {
      phone
    }
    httpAgent.post('/user/getCode', body).then(res => {
      const {code, message} = res
      if (code === 0) {
        tosts.success(message)
      } else {
        tosts.error(message)
      }
    })

  }

  onRegister = () => {
    const {httpAgent, changeUserStatus, getUserInfo} = this.props
    const {account, phone, code, password} = this.state
    const body = {
      account,
      phone,
      code,
      password
    }
    httpAgent.post('/user/register', body).then(res => {
      const {code, message, data} = res
      if (code === 0) {
        tosts.success(message)
        storeAuth(data)
        getUserInfo()
        changeUserStatus('out')
      } else {
        tosts.error(message)
      }
    })
  }


  render() {
    const {changeUserStatus, close, noTop} = this.props
    return (<Modal
      show={true}
      onMask={() => {
        close && changeUserStatus('out')
      }}
      replaceStyle={noTop ? null : {
        top: '50px',
        height: 'calc(100% - 60px)',
      }}
    >
      <div className="register">

        <div className="formitem">
          <h2 className="title">注册</h2>
        </div>
        <div className="formitem ">
          <label className="lab">账号：</label>
          <div className="mix">
            <input type="text" className="ipt" name="account" onChange={this.onChange}/>
            <span className="tip">字母开头/长度:3-16位/包含:字母 - 数字</span>
          </div>
        </div>
        <div className="formitem ">
          <label className="lab">手机：</label>
          <div className="mix">
            <input type="text" className="ipt" name="phone" onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem ">
          <label className="lab">验证：</label>
          <div className="mix code ">
            <input type="text" className="ipt" name="code" onChange={this.onChange}/>
            <a className="btn btn-info send" onClick={this.getCode}>获取验证码</a>
          </div>
        </div>
        <div className="formitem ">
          <label className="lab">密码：</label>
          <div className="mix">
            <input type="password" className="ipt" name="password" onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem">
          <button className="btn btn-info" onClick={this.onRegister}>确定</button>
        </div>
        <div style={{textAlign: 'right'}}>
          <button className="btn btn-outline-secondary btn-s" onClick={() => {
            changeUserStatus('login')
          }}>登录
          </button>
        </div>
      </div>
    </Modal>)

  }


}
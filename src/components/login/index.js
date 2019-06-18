import React from 'react'
import {tosts, Modal} from '@/ui'
import {storeAuth} from '../../utils/auth'
import './index.css'

export default class Login extends React.Component {

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  onLogin = () => {
    const {httpAgent, getUserInfo, changeUserStatus} = this.props
    const {account, password} = this.state
    const body = {
      account,
      password
    }
    httpAgent.post('/user/login', body).then(res => {
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
      <div className="login">
        <div className="formitem"><h2 className="title">登录</h2></div>
        <div className="formitem "><label className="lab">账号：</label>
          <div className="mix">
            <input type="text" className="ipt" name="account" onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem "><label className="lab">密码：</label>
          <div className="mix">
            <input type="password" className="ipt" name="password" onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem">
          <button className="btn btn-info" onClick={this.onLogin}>确定</button>
        </div>
        <div style={{textAlign: 'right'}}>
          <button className="btn btn-outline-secondary btn-s" onClick={() => {
            changeUserStatus('register')
          }}>注册
          </button>
        </div>
      </div>
    </Modal>)

  }


}
import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class Top extends React.Component {

  render() {
    const {userInfo, loginOut, changeUserStatus} = this.props
    return(<div className="top">
      <div className="wrap">
      <Link className="logo" to="/">BrickUI</Link>
      <div className="search clearfix">
        <input />
        <div className="btn btn-success btn-s">搜索</div>
      </div>
      <div className="nav">
        <Link to="/wall">砖墙(模块市场)</Link>
        <Link to="/dev">开发者</Link>
        {userInfo && userInfo.account ? <a>{userInfo.account}</a> : <a onClick={()=>{changeUserStatus('login')}}>登录</a>}
        {userInfo && userInfo.account ? <a onClick={loginOut}>退出</a> : <a onClick={()=>{changeUserStatus('register')}}>注册</a>}
      </div>
      </div>
    </div>)
  }


}
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './index.css'

export default class Top extends React.Component {

  render() {
    const {userInfo, loginOut, changeUserStatus} = this.props
    return(<div className="top-layout">
      <div className="wrap">
      <Link className="logo" to="/">BrickUI</Link>
      <div className="search clearfix">
        <input />
        <div className="btn btn-success btn-s">搜索</div>
      </div>
      <div className="nav">
        <NavLink to="/brick"><span>砖块(模块市场)</span></NavLink>
        <NavLink to="/wall"><span>砖墙(作品集)</span></NavLink>
        <NavLink to="/rule"><span>规范</span></NavLink>
        <NavLink to="/dev"><span>开发者</span></NavLink>
        <NavLink to="/works"><span>我的作品</span></NavLink>
        {userInfo && userInfo.account ? <a><span>{userInfo.account}</span></a>
          : <a onClick={()=>{changeUserStatus('login')}}><span>登录</span></a>
        }
        {userInfo && userInfo.account ? <a onClick={loginOut}><span>退出</span></a>
          : <a onClick={()=>{changeUserStatus('register')}}><span>注册</span></a>
        }
      </div>
      </div>
    </div>)
  }


}
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import User from '../user'
import ENV from '../../config/env'
import './index.css'

export default class Top extends React.Component {

  render() {
    const {userInfo, loginOut, changeUserStatus} = this.props
    return(<div className="top-layout">
      <div className="wrap">
      <Link className="logo" to="/">
        <img src={`${ENV.PUBLIC_URL}/bui.png`} alt="BrickUI" />
      </Link>
      <div className="nav">
        <NavLink to="/brick"><span>积木/模块</span></NavLink>
        <NavLink to="/web"><span>作品</span></NavLink>
        <NavLink to="/rule"><span>规范</span></NavLink>
        <NavLink to="/dev"><span>开发者</span></NavLink>
        {userInfo && userInfo.account ?
          <User userInfo={userInfo} loginOut={loginOut}/>
          : [<a onClick={()=>{changeUserStatus('login')}}><span>登录</span></a>,<a onClick={()=>{changeUserStatus('register')}}><span>注册</span></a>]
        }
      </div>
      </div>
    </div>)
  }


}
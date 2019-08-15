import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import defaultHeader from './default.png'
import './index.css'


export default class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  menuShow = () => {
    this.setState({visible: true})
  }

  menuHide = () => {
    this.setState({visible: false})
  }

  render () {

    const { loginOut, userInfo } = this.props
    const { visible } = this.state

    return(<div className="user-top" onMouseEnter={this.menuShow} onMouseLeave={this.menuHide}>
      <div className="header-icon">
        <span><img src={defaultHeader} /></span>
      </div>
      {visible ? <ul className="user-menu">
        <li>{userInfo.account}</li>
        <li><NavLink to="/works">我的作品</NavLink></li>
        <li><NavLink to="/assets">我的素材</NavLink></li>
        <li onClick={loginOut}>退出</li>
      </ul> : null}
    </div>)

  }

}
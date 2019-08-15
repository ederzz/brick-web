import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import './assets/css/normalize.css'
import './assets/css/restyle.css'
import './assets/css/skin.css'
import './assets/css/button.css'
import './assets/css/form.css'
import './assets/css/codemirror.css'
import './assets/css/panda-syntax.css' // codemirror 主题
import Home from './pages/home'
import DevHome from './pages/devHome'
import Dev from './pages/dev'
import Preview from './pages/preview'
import Brick from './pages/brick'
import Web from './pages/web'
import Rule from './pages/rule'
import Works from './pages/works'
import WorksEditor from './pages/works/editor'
import Assets from './pages/assets'
import Collect from './pages/collect'
import Top from './components/top'
import Footer from './components/footer'
import Login from './components/login'
import Register from './components/register'
import {tosts} from '@/ui'
import httpAgent from './utils/httpAgent'
import ENV from './config/env'
import { clearLogin } from './utils/auth'
import setStorage from'./utils/setStorage'

const history = createBrowserHistory()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userStatus: 'out', // out login register
      userInfo: {},
    }
    this.agent = httpAgent(ENV.APIROOT)
    setStorage(this.getUserInfo) // 新打开的窗口设置token 并且回掉 获取用户信息(因为是异步的所以did mount 时token不存在)
  }

  componentDidMount () {
    if(sessionStorage.token) {
      this.getUserInfo()
    }
  }

  // 修改用户当前状态
  changeUserStatus = (userStatus) => {
    this.setState({userStatus})
  }

  // 获取用户信息
  getUserInfo = () => {
    this.agent.get('/user/info').then(res=>{
      const {code,data,message='获取用户信息失败'} = res
      if(code === 0 && data && Object.keys(data).length) {
        this.setState({userInfo:data})
      }else if(code === 0) {
        tosts.error('没有获取到用户信息')
      }else{
        // tosts.error(message)
      }
    })
  }

  loginOut = () => {
    clearLogin()
    this.setState({userInfo:{}})
  }

  preRender = (props, Comp, params = {}) => {
    const {userStatus, userInfo} = this.state
    const {noTop = false, mastLogin = false} = params
    const topCom = <Top changeUserStatus={this.changeUserStatus} userInfo={userInfo} loginOut={this.loginOut}/>
    const footerCom = <Footer/>
    const loginProps = {
      changeUserStatus: this.changeUserStatus,
      httpAgent: this.agent,
      getUserInfo: this.getUserInfo,
      noTop,
    }
    const registerProps = {
      changeUserStatus: this.changeUserStatus,
      httpAgent: this.agent,
      getUserInfo: this.getUserInfo,
      noTop
    }

    if (mastLogin && userInfo && Object.keys(userInfo).length === 0) {
      return (<div id="app">
        {userStatus === 'register' ? <Register {...registerProps} /> : <Login {...loginProps} />
        }
        {noTop ? null : topCom}
        {noTop ? null : footerCom}
      </div>)
    }

    return (<div id="app">
      {userStatus === 'login' ? <Login {...loginProps} close={true} /> : (userStatus === 'register' ? <Register {...registerProps} close={true} /> : null)}
      {noTop ? null : topCom}
      <Comp {...props} {...{userInfo, httpAgent: this.agent}}/>
      {noTop ? null : footerCom}
    </div>)
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => this.preRender(props, Home)}/>
          <Route exact path="/dev" render={(props) => this.preRender(props, DevHome, {mastLogin: true})}/>
          <Route path="/dev/:name" render={(props) => this.preRender(props, Dev, {noTop: true, mastLogin: true})}/>
          <Route path="/p" render={(props) => this.preRender(props, Preview, {noTop: true})}/>
          <Route path="/brick" render={(props) => this.preRender(props, Brick)}/>
          <Route path="/web" render={(props) => this.preRender(props, Web)}/>
          <Route path="/rule" render={(props) => this.preRender(props, Rule)}/>
          <Route exact path="/works" render={(props) => this.preRender(props, Works, {mastLogin: true})}/>
          <Route path="/works/:id" render={(props) => this.preRender(props, WorksEditor, {mastLogin: true})}/>
          <Route exact path="/assets" render={(props) => this.preRender(props, Assets, {mastLogin: true})}/>
          <Route path="/collect" render={(props) => this.preRender(props, Collect, {mastLogin: true})}/>
        </Switch>
      </Router>
    )
  }


}
import React from 'react'
import './index.css'


export default class ModuleToggle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 1
    }
  }

  componentDidMount () {
    const {moduleActive} = this.props
    this.setState({active: moduleActive})
  }

  onToggle = () => {
    const {active} = this.state
    const {changeModule} = this.props

    if(active < 3) {
      this.setState({active: active+1},()=>{changeModule(active+1)})
    }else{
      this.setState({active: 1},()=>{changeModule(1)})
    }

  }


  render () {

    const {active} = this.state

    const options = [
      {
        key: 1,
        name: '模块'
      },
      {
        key: 2,
        name: '数组'
      },
      {
        key: 3,
        name: '文字'
      },
    ]

    let activeItem = {}

    for(const i in options) {

     if(options[i].key === active) {
       activeItem = options[i]
     }

    }

    return (<div className="module-toggle" onClick={this.onToggle}>
      {activeItem.name}
    </div>)


  }


}
import React from 'react'
import {Scroll} from '@/ui'
import './index.css'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      optionsVisible: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.selectClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.selectClick, false)
  }

  selectClick = (e) => {
    // const {optionsVisible} = this.state
    if (!this.select.contains(e.target)) {
      this.optionsClose()
    }
  }

  onChange = (option) => {
    const {onChange} = this.props
    onChange(option)
    this.optionsClose()
  }

  getOptions = () => {

    const {options} = this.props
    let lis = []

    if (Array.isArray(options) && options.length) {
      lis = options.map(v => {
        return <li key={v.value} onClick={()=>{this.onChange(v)}}>
          {v.name}
        </li>
      })
    } else {
      lis = [
        <li>没有数据</li>
      ]
    }

    return <div className="options">
      <Scroll>
        <ul>
          {lis}
        </ul>
      </Scroll>
    </div>

  }

  onFocus = () => {
    this.optionsOpen()
  }

  optionsOpen = () => {
    this.setState({optionsVisible: true})
  }

  optionsClose = () => {
    this.setState({optionsVisible: false})
  }


  render() {
    const {value} = this.props
    const {optionsVisible} = this.state
    return (<div
      className="select"
      ref={ref => this.select = ref}
    >
      <strong onClick={this.onFocus}>{value ? value.name : ''}</strong>
      {optionsVisible ? this.getOptions() : null}
    </div>)
  }

}
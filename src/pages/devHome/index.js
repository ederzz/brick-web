import React from 'react'
import {Link} from 'react-router-dom'
import {tosts} from '@/ui'
import CreateProject from '../../components/createProject'
import './index.css'

export default class DevHome extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      visible: false,
    }

  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const {httpAgent} = this.props

    httpAgent.get('/dev/getList').then(res => {
      const {code, message, data} = res
      if (code === 0) {
        this.setState({data})
      } else {
        tosts.error(message)
      }
    })
  }

  getList = () => {
    const {data} = this.state
    if (Array.isArray(data) && data.length) {

      const lis = data.map(v => {
        return <Link to={`/dev/${v.name}`} key={v.name}><i></i><span>{v.name}</span></Link>
      })

      return <div className="my-pro-list clearfix">{lis}</div>

    } else {
      return null
    }
  }

  modalOpen = () => {
    this.setState({visible: true})
  }

  modalClose = () => {
    this.setState({visible: false})
  }

  render() {
    const {httpAgent} = this.props
    const {visible} = this.state
    return (
      <div className="wrap">
        {this.getList()}
        <div className="my-pro-create-btn">
          <div className="btn btn-primary" onClick={this.modalOpen}>创建</div>
          <Link to="/rule" target="_blank" className="btn btn-link">请查看开发规范</Link>
        </div>
        {visible ? <CreateProject httpAgent={httpAgent} modalClose={this.modalClose} getData={this.getData}/> : null}
      </div>
    )
  }


}
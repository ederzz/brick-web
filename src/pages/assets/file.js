import React from 'react'
import {Scroll, tosts} from '@/ui'
import Upload from '../../components/upload'
import './file.css'

export default class File extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      data:[]
    }
  }

  componentDidMount () {
    this.getFiels()
  }

  getFiels = () => {
    // assets/getFiels
    const { httpAgent, activeFolder  } = this.props

    httpAgent.post('/assets/getFiels',{folder_id:activeFolder.id}).then(res=>{
      const {code,message,data} = res
      if(code === 0) {
        this.setState({data})
      }else{
        tosts.error(message)
      }
    })
  }

  getList = () => {
    const {data} = this.state

    if(!Array.isArray(data) || data.length === 0) {
      return null
    }

    const lis = data.map(v=>{

      return <li key={v.id}>
        {this.getImg(`//assets.brickui.com${v.url}`)}
        <span className="url">//assets.brickui.com{v.url}</span>
      </li>

    })

    return <ul className="assets-file-list clearfix">{lis}</ul>
  }

  getImg = (url) => {

    const suffix = url.lastIndexOf('.') !== -1 ? url.slice(url.lastIndexOf('.')+1) : ''

    if(['png','jpg'].includes(suffix)) {
      return <span className="img"><img src={url} /></span>
    }else{
      return <span className="text">{suffix}</span>
    }
  }


  render () {

    const { closeModal, httpAgent, userInfo, activeFolder } = this.props

    return (<div className="assets-file">
      <div className="body">
        <Scroll>
          {this.getList()}
        </Scroll>
      </div>
      <div className="footer">
        <Upload httpAgent={httpAgent} userInfo={userInfo} folder={activeFolder} getFiels={this.getFiels} />
      </div>
      <i className="close" onClick={closeModal} />
    </div>)

  }


}
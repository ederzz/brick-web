import React from 'react'
import {Modal, tosts} from '@/ui'
import File from './file'
import UpdateFolder from './updateFolder'
import './index.css'

export default class Assets extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      fileVisible: false,// 列表模态框
      activeFolder: {}, // 当前打开的文件夹
      updateFolderVisible: false,
      data:[
      ]
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const {httpAgent} = this.props
    httpAgent.get('/folder/getList').then(res=>{
      const {code, message, data} = res
      if (code === 0) {
        this.setState({data})
      } else {
        tosts.error(message)
      }
    })
  }

  getListDom = () => {
    const {data} = this.state

    if(!Array.isArray(data) || data.length === 0) {
      return null
    }

    const lis = data.map(v=>{

      return <li key={v.id} onClick={()=>{this.getFile(v)}}>
        <i />
        <span>{v.name}</span>
      </li>
    })

    return <ul className="assets-list clearfix">{lis}</ul>
  }

  getFile = (info) => {
    this.setState({fileVisible:true, activeFolder:info})
  }

  closeFileModal = () => {
    this.setState({fileVisible:false})
  }

  closeUpdateFolderModal = () => {
    this.setState({updateFolderVisible: false})
  }

  openUpdateFolderModal = () => {
    this.setState({updateFolderVisible: true})
  }

  render() {
    const { fileVisible, updateFolderVisible, activeFolder } = this.state
    const { httpAgent, userInfo } = this.props
    return (<div className="wrap clearfix">
      {this.getListDom()}
      <div className="assets-footer">
        <div className="btn btn-primary" onClick={this.openUpdateFolderModal}>创建文件夹</div>
      </div>
      <Modal show={fileVisible} onMask={this.closeFileModal}>
        <File closeModal={this.closeFileModal} httpAgent={httpAgent} userInfo={userInfo} activeFolder={activeFolder}/>
      </Modal>
      <Modal show={updateFolderVisible} onMask={this.closeUpdateFolderModal}>
        <UpdateFolder httpAgent={httpAgent} closeModal={this.closeUpdateFolderModal} getList={this.getList} />
      </Modal>
    </div>)
  }


}
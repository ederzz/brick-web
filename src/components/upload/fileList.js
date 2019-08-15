import React from 'react'
import {Scroll} from '@/ui'
import './fileList.css'

export default class FileList extends React.Component {

  getList = () => {
    const {fileList, userInfo, folder, changePath} = this.props

    if (!Array.isArray(fileList) || fileList.length === 0) {
      return null
    }

    const lis = fileList.map(v => {
      const suffix = v.name.lastIndexOf('.') !== -1 ? v.name.slice(v.name.lastIndexOf('.')) : ''
      return <li key={v.name}>
        <p>上传文件：{v.name}</p>
        <p>
          <span>保存路径：/{userInfo.account}/{folder.name}/</span>
          <input placeholder="文件名(a-z,-,0-9)" onBlur={(e)=>{changePath(v.name,`/${userInfo.account}/${folder.name}/${e.target.value}${suffix}`)}}/>
          <span>{suffix}</span>
        </p>
      </li>
    })

    return <ul className="list clearfix">{lis}</ul>

  }

  render() {
    console.log('FileList render', this.props, this.state)
    const {checkAuth, uploadFiles} = this.props
    return (<div className="up-file-list">
      <div className="body">
        <Scroll>
          {this.getList()}
        </Scroll>
      </div>
      <div className="footer">
        <span className="btn btn-primary" onClick={checkAuth}>添加文件</span>
        <span className="btn btn-primary" onClick={uploadFiles}>开始上传</span>
      </div>
    </div>)
  }

}
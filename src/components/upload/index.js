import React from 'react'
import OSS from 'ali-oss'
import {tosts, Modal} from '@/ui'
import FileList from './fileList'
import './index.css'

export default class Upload extends React.Component {

  constructor(props) {
    super(props)
    this.inputFile = React.createRef()
    this.state = {
      visible: false,
      fileList: [],
      pathObjs: {},
    }
  }

  checkAuth = () => {

    if(this.client) {
      this.chooseFile()
      this.openModel()
    } else if(localStorage.ssoLocalExpiration > new Date().getTime()) {
      this.client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: localStorage.accessKeyId,
        accessKeySecret: localStorage.accessKeySecret,
        stsToken: localStorage.securityToken,
        bucket: 'brickui-assets'
      });

      this.chooseFile()
      this.openModel()

    }else{
      const {httpAgent} = this.props
      httpAgent.get('/getSts').then(res=>{
        const {code,data,message} = res
        if(code === 0) {
          const {Credentials:{AccessKeyId, AccessKeySecret, Expiration, SecurityToken}} = data
          localStorage.accessKeyId = AccessKeyId
          localStorage.accessKeySecret = AccessKeySecret
          localStorage.securityToken = SecurityToken
          localStorage.ssoLocalExpiration = new Date().getTime() + 3000*1000 // 50分钟后过期
          this.checkAuth()
        }else{
          tosts.error(message)
        }
      })
    }

  }

  chooseFile = () => {
    const e = document.createEvent("MouseEvents")
    e.initEvent("click", true, true)
    this.inputFile.current.dispatchEvent(e)
  }

  openModel = () => {
    this.setState({visible: true})
  }

  closeModel = () => {
    this.setState({visible: false})
  }

  fileOnChange = (e) => {
    const filesObj = e.target.files
    const files = []
    for(const file of filesObj) {
      files.push(file)
    }

    const { fileList } = this.state
    const newList = fileList.concat(files)
    this.setState({fileList:newList})
  }

  pushFile = (file) => {
    const that = this
    const client = this.client
    const saveUrl = this.saveUrl
    const url = this.state.pathObjs[file.name]
    client.put(url, file).then(function (res) {
      //console.log('put success', res);
      that.urls.push(res.name)
      that.putCount = that.putCount + 1
      saveUrl(that.putCount,that.fileCount,that.urls)
      // 把文件url写入数据库
    }).catch(function (err) {
      //console.error('error', err);
      that.putCount = that.putCount + 1
      saveUrl(that.putCount,that.fileCount,that.urls)
      tosts.error(err)
    });
  }

  uploadFiles = () => {
    const {fileList} = this.state
    this.fileCount = fileList.length
    this.putCount = 0
    this.urls = []
    for(const file of fileList) {
      this.pushFile(file)
    }
  }

  saveUrl = (putCount,fileCount,urls) => {
    // console.log(putCount,fileCount)
    const {httpAgent, folder, getFiels} = this.props
    if(putCount === fileCount) {
      console.log('urls',urls)
      httpAgent.post('/assets/saveFiels',{urls,folder_id:folder.id}).then(res=>{
        const {code,message} = res
        if(code === 0) {
          this.closeModel()
          getFiels()
        }else{
          tosts.error(message)
        }
      })
    }
  }

  changePath = (label,value) => {
    const {pathObjs} = this.state

    pathObjs[label] = value // .replace(/\./g,'')

    this.setState({pathObjs})
  }

  render () {

    const {fileList, visible} = this.state
    const { userInfo, folder } = this.props

    return(<div className="u-upload">
      <span className="btn btn-primary" onClick={this.checkAuth}>上传文件</span>
      <input
        name='files[]'
        style={{display: 'none'}}
        type="file" ref={this.inputFile}
        multiple="multiple"
        onChange={this.fileOnChange}
      />
      <Modal show={visible} onMask={this.closeModel}>
        <FileList fileList={fileList} checkAuth={this.checkAuth} userInfo={userInfo} folder={folder} changePath={this.changePath} uploadFiles={this.uploadFiles}/>
      </Modal>
    </div>)

  }


}
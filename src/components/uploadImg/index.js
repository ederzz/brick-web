import React from 'react'
import OSS from 'ali-oss'
import {tosts, Modal} from '@/ui'
import addImg from './add.png'
import './index.css'


export default class Upload extends React.Component {

  constructor(props) {
    super(props)
    this.inputFile = React.createRef()
    this.state = {
    }
  }

  checkAuth = () => {

    if(this.client) {
      this.chooseFile()
    } else if(localStorage.ssoLocalExpiration > new Date().getTime()) {
      this.client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: localStorage.accessKeyId,
        accessKeySecret: localStorage.accessKeySecret,
        stsToken: localStorage.securityToken,
        bucket: 'brickui-assets'
      });

      this.chooseFile()

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
    console.log('chooseFile')
    const e = document.createEvent("MouseEvents")
    e.initEvent("click", true, true)
    this.inputFile.current.dispatchEvent(e)
  }

  fileOnChange = (e) => {
    const {onChange} = this.props
    const filesObj = e.target.files
    const file = filesObj[0]
    console.log('file on change',file)
    this.setState({file})
    onChange(null)
  }

  pushFile = (file) => {
    const {onChange} = this.props
    const that = this
    const url = this.getUrl(file.name)
    that.client.put(url, file).then(function (res) {
      // 返回 图片地址
      onChange(url)
    }).catch(function (err) {
      tosts.error(err)
    });
  }

  getUrl = (fileName) => {
    const suffix = fileName.lastIndexOf('.') !== -1 ? fileName.slice(fileName.lastIndexOf('.')) : ''
    const date = new Date()
    const fullYear = date.getFullYear()
    let month = date.getMonth()+1
    month = month < 10 ? `0${month}` : month
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    const random = Math.floor(Math.random() * 9999999999) + 1000000000
    const url = `${fullYear}/${month}/${day}/${random}${suffix}`
    return url
  }

  saveFile = () => {
    const {file} = this.state
    this.pushFile(file)
  }

  render () {
    console.log('upload img ',this.state)
    const { value } = this.props
    const {file} = this.state

    return(<div className="u-upload-img clearfix">
      <input
        name='file'
        type="file" ref={this.inputFile}
        onChange={this.fileOnChange}
      />
      <span className="img" onClick={this.checkAuth}>
        {value ? <img src={`//assets.brickui.com/${value}`} /> : (file ? <span className="file-name">{file.name}</span> : <img src={addImg} />)}
      </span>
      <div className="handle">
        <span className="tips">建议图片比例16:9(320*180)</span>
        {file ? <span className="btn btn-primary" onClick={this.saveFile}>上传</span> : null}
      </div>
    </div>)

  }


}